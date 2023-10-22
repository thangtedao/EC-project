import React from "react";
import NavLinks from "./NavLinks";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 0 5px;
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--primary-500);
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
      <NavLinks text="Điện thoại, Tablet" icon={<SmartphoneIcon />} path="#" />
      <NavLinks text="Điện thoại, Tablet" icon={<SmartphoneIcon />} path="#" />
      <NavLinks text="Điện thoại, Tablet" icon={<SmartphoneIcon />} path="#" />
      <NavLinks text="Điện thoại, Tablet" icon={<SmartphoneIcon />} path="#" />
    </Wrapper>
  );
};

export default NavContainer;
