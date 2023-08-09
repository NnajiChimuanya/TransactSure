import React, { useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { MdApps } from "react-icons/md";

interface INavBar {
  name: string;
  Icon: IconType;
}

const navBarList: INavBar[] = [
  { name: "Home", Icon: AiOutlineHome },
  { name: "Business", Icon: PiHandCoinsDuotone },
  { name: "Community", Icon: FiUsers },
  { name: "More", Icon: MdApps },
];

const NavBar = () => {
  const [active, setActive] = useState<React.SetStateAction<number>>(0);

  const handleLinkClick = (id: number) => {
    setActive(id);
  };

  return (
    <div className="buttomNavigation">
      {navBarList.map((item, id) => {
        let { name, Icon } = item;
        return (
          <div
            className={`item  ${active === id ? `active` : null}`}
            key={id}
            onClick={() => handleLinkClick(id)}
          >
            <Icon className="navbarIcon" />
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
