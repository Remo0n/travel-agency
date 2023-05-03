import React, { useState } from "react";
import styled from "styled-components";

const Autocomplete = ({
  name,
  options,
  nextFoucs,
  flagSearch,
  placeholder,
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onChange = (e) => {
    const userInput = e.currentTarget.value;
    if (!flagSearch) {
      const filteredOptions = options.filter(
        (optionName) =>
          optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
      setFilteredOptions(filteredOptions);
      setShowOptions(true);
      setUserInput(e.currentTarget.value);
    } else {
      const filteredOptions = options.filter(
        (optionName) =>
          optionName.nationality
            .toLowerCase()
            .indexOf(userInput.toLowerCase()) > -1
      );
      setFilteredOptions(filteredOptions);
      setShowOptions(true);
      setUserInput(e.currentTarget.value);
    }
  };

  const onClick = (e) => {
    setFilteredOptions([]);
    setShowOptions(false);
    setUserInput(e.currentTarget.innerText);
    if (nextFoucs) {
      nextFoucs(e.currentTarget.parentElement.previousElementSibling.name);
    }
  };

  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <Ul>
          {!flagSearch
            ? filteredOptions.map((optionName) => {
                return (
                  <Li key={optionName} onClick={onClick}>
                    {optionName}
                  </Li>
                );
              })
            : filteredOptions.map((optionName) => {
                return (
                  <Li key={optionName.nationality} onClick={onClick}>
                    <img
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${optionName.flag}.svg`}
                    />
                    {optionName.nationality}
                  </Li>
                );
              })}
        </Ul>
      );
    } else {
      optionList = (
        <Ul className="no-options">
          <em>No Option!</em>
        </Ul>
      );
    }
  }

  return (
    <Search className="search">
      <input
        name={name}
        type="text"
        className="search-box"
        onChange={onChange}
        value={userInput}
        placeholder={placeholder}
      />
      {optionList}
    </Search>
  );
};

export default Autocomplete;

const Ul = styled.ul`
  position: absolute;
  list-style: none;
  text-align: left;
  background: rgba(255, 255, 255);
  left: 0;
  right: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  top: 19px;
  padding-bottom: 5px;
`;
const Li = styled.li`
  cursor: pointer;
  img {
    width: 20px;
    margin-right: 10px;
  }
`;
const Search = styled.div`
  position: relative;

  input {
    font-size: 1rem;
    font-family: cursive;
  }
`;
