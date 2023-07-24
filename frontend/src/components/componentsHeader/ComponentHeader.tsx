import React from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";

const ComponentHeader = () => {
  let navigate = useNavigate();

  return (
    <div className="componentHeader">
      <MdKeyboardBackspace className="backspace" onClick={() => navigate(-1)} />

      <IoMdNotificationsOutline className="notificationsIcon" />
    </div>
  );
};

export default ComponentHeader;
