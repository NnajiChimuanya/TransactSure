import React from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationPage from "../../pages/notification/NotificationPage";
import { Link } from "react-router-dom";

const ComponentHeader = () => {
  let navigate = useNavigate();

  return (
    <div className="componentHeader">
      <MdKeyboardBackspace className="backspace" onClick={() => navigate(-1)} />

      <Link className="link" to={"/notification"}>
        <IoMdNotificationsOutline className="notificationsIcon" />
      </Link>
    </div>
  );
};

export default ComponentHeader;
