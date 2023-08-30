import React from "react";
import { FaTimes } from "react-icons/fa";
import "./Modal.css";
import { useInfoContext } from "../context/InfoContext";

const Modal = ({ children }) => {
  const { isOpenModal, setIsOpenModal } = useInfoContext();

  return (
    <div className={isOpenModal ? "modal-overlay show-modal" : "modal-overlay"}>
      <div className="modal-container">
        {children}
        <button className="close-modal-btn" onClick={() => setIsOpenModal(false)}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Modal;
