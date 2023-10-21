import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = ({ text, icon, path }) => {
  return (
    <div>
      <NavLink to={path} className="nav-link">
        <span className="icon">{icon}</span>
        {text}
      </NavLink>
    </div>
  );
};

export default NavLinks;
