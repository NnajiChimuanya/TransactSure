import React, { useState, useContext } from "react";
import { MdClear } from "react-icons/md";
import { SkyeWalletContext } from "../../context/Context";

const Modal = () => {
  const { state, dispatch } = useContext(SkyeWalletContext);
  const { showModal, showModalMessage } = state;

  const toggleModal = () => {
    dispatch({ type: "SET_MODAL", payload: false });
  };

  return (
    <div
      onClick={toggleModal}
      className={`modalContainer ${showModal ? null : `closeModal`}`}
    >
      <div className="modal">
        <div className="clearIcon">
          <MdClear onClick={toggleModal} />
        </div>

        <div className="modalText">
          {showModalMessage}
          {/* Sorry, this PIN is not correct, please try again. */}
        </div>

        <button onClick={toggleModal} className="modalButton">
          Try again
        </button>
      </div>
    </div>
  );
};

export default Modal;
