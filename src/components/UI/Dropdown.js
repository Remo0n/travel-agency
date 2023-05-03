import React, { useState } from "react";
import styled from "styled-components";

const Dropdown = ({ options, id }) => {
  const [selected, setSelected] = useState(null);
  const [opened, setOpened] = useState(false);

  const onOpen = () => {
    setOpened(!opened);
  };

  const onSelect = (option) => {
    setSelected(option);
    setOpened(false);
  };

  const getOptions = () => {
    return options.map((o) => (
      <Option key={o.key} option={o} onSelect={onSelect} />
    ));
  };

  let items = getOptions();
  let selectedText = selected ? selected.value : id;
  let cssClass = opened ? "show" : "hide";

  return (
    <DropdownWrapper onClick={onOpen}>
      <div>
        <span>{selectedText}</span>
        <i className={`fa fa-chevron-right icon ${opened && "open"}`}>▲</i>
        <ul className={cssClass}>{items}</ul>
      </div>
    </DropdownWrapper>
  );
};

const Option = ({ option, onSelect }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onSelect(option);
  };

  return <ListItem onClick={handleClick}>{option.value}</ListItem>;
};

export default Dropdown;

const DropdownWrapper = styled.div`
  width: 250px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-top: 30px;

  div {
    padding: 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  ul {
    list-style: none;
    padding: 10px 20px;
    margin: 0;
    position: absolute;
    border: 1px solid #ececec;
    left: 0px;
    right: 0px;
    top: 38px;
    padding: 5px;
    border-top: 1px solid #e5e8ec;
    background: white;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    transition: all 0.2s ease-in-out;
  }

  .show {
    display: inline-block;
    opacity: 1;
  }

  .hide {
    display: none;
    opacity: 0;
  }

  .icon {
    font-size: 13px;
    color: #91a5be;
    transform: rotate(0deg);
    transition: all 0.2s ease-in-out;
  }

  .icon.open {
    transform: rotate(180deg);
  }
`;

const ListItem = styled.li`
  padding: 10px;
`;
