import React from "react";
import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { MdApps } from "react-icons/md";

interface INavBar {
  name: string;
  Icon: IconType;
}

const navBarList = [
  { name: "Home", Icon: AiOutlineHome },
  { name: "Business", Icon: PiHandCoinsDuotone },
  { name: "Community", Icon: FiUsers },
  { name: "More", Icon: MdApps },
];

const NavBar = () => {
  return (
    <div className="buttomNavigation">
      {navBarList.map((item, id) => {
        let { name, Icon } = item;
        return (
          <div className="item" key={id}>
            <Icon className="navbarIcon" />
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
