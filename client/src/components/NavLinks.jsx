import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = ({ text, icon, path, image }) => {
  return (
    <NavLink to={path} className="nav-link">
      <img src={image} />
      <span className="icon">{icon}</span>
      {text}
    </NavLink>
  );
};

export default NavLinks;
