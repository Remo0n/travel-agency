import { useState, useEffect } from "react";
import ReactPortal from "./ReactPortal";
import styled from "styled-components";
import Dropdown from "../UI/Dropdown";

// Modal component.
const Modal = ({ isOpen, setOpenModal }) => {
  useEffect(() => {
    setOpend(isOpen);
  }, [isOpen]);
  const [opend, setOpend] = useState(false);
  // Return null if isOpen props from parent is false.
  if (!opend) return null;
  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <ModalWrapper>
        <ModalContent>
          <div className="header">
            <h4>More Search options</h4>
            <span
              onClick={() => {
                setOpend(false);
                setOpenModal(false);
              }}
            >
              &#10060;
            </span>
          </div>
          <div className="body">
            <Dropdown
              options={[
                { key: "o1", value: "EGP" },
                { key: "o2", value: "USD" },
                { key: "o3", value: "EUR" },
              ]}
              id="currency"
            />
            <Dropdown
              options={[
                { key: "o1", value: "Egypt" },
                { key: "o2", value: "Saudi" },
                { key: "o3", value: "United Emirates" },
              ]}
              id="country"
            />
            <Dropdown
              options={[
                { key: "o1", value: "Beach" },
                { key: "o2", value: "Safari" },
                { key: "o3", value: "Diving" },
              ]}
              id="activity"
            />
          </div>
        </ModalContent>
      </ModalWrapper>
    </ReactPortal>
  );
};
export default Modal;

const ModalWrapper = styled.nav`
  position: fixed;
  z-index: 9;
  padding-top: 300px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

const ModalContent = styled.nav`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  border-radius: 5px;
  .header {
    display: flex;
    justify-content: space-between;

    h4 {
      margin: 0;
    }
  }

  .body {
    display: flex;
    justify-content: space-around;
  }

  span {
    cursor: pointer;
  }
`;
