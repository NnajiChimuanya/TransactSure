import React from "react";
import { MdClear } from "react-icons/md";

const Modal = () => {
  return (
    <div className="modalContainer">
      <div className="modal">
        <div className="clearIcon">
          <MdClear />
        </div>

        <div className="modalText">
        Sorry, this PIN is not correct, please try again. 
        </div>

        <button className="modalButton">Try again</button>
      </div>
    </div>
  );
};

export default Modal;
