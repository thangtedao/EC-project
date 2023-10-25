import React from "react";
import NavLinks from "./NavLinks";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import styled from "styled-components";

const Wrapper = styled.section`
  .menu-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: 1px solid lightgray;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 200px;
    height: 100%;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--primary-500);
    padding: 3px 2px;
    :hover {
      background: #efecec;
    }
  }
  .icon {
    margin-right: 10px;
    display: grid;
    place-items: center;
  }
`;

const NavContainer = () => {
  return (
    <Wrapper>
      <div className="menu-container">
        <NavLinks
          text="Điện thoại, Tablet"
          icon={<SmartphoneIcon />}
          path="#"
        />
        <NavLinks
          text="Điện thoại, Tablet"
          icon={<SmartphoneIcon />}
          path="#"
        />
        <NavLinks
          text="Điện thoại, Tablet"
          icon={<SmartphoneIcon />}
          path="#"
        />
        <NavLinks
          text="Điện thoại, Tablet"
          icon={<SmartphoneIcon />}
          path="#"
        />
      </div>
    </Wrapper>
  );
};

export default NavContainer;
