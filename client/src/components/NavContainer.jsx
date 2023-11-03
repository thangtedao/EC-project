import React, { useState } from "react";
import NavLinks from "./NavLinks";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import styled from "styled-components";
import { useHomeContext } from "../pages/Home";

const Wrapper = styled.div`
  .menu-container {
    overflow: hidden;
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
  // const { categories } = useHomeContext();

  const categories = [
    {
      name: "Điện thoại",
      categoryProduct: [
        {
          brandName: "Apple",
          color: "Red",
        },
        {
          brandName: "Samsung",
          color: "Red",
        },
      ],
    },
    {
      name: "Máy tính",
      categoryProduct: [
        {
          brandName: "Oppo",
          color: "White",
        },
        {
          brandName: "Huwaei",
          color: "Black",
        },
      ],
    },
    {
      name: "Laptop",
      categoryProduct: [
        {
          brandName: "Pokemon",
          color: "Blue",
        },
        {
          brandName: "Dragon Ball",
          color: "Green",
        },
      ],
    },
  ];

  return (
    <Wrapper>
      <div className="menu-container">
        {/* MENU TREE */}
        {categories?.map((category, index) => {
          return (
            <div key={index} className="item">
              <NavLinks
                text={category.name}
                icon={<SmartphoneIcon />}
                path="#"
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default NavContainer;
