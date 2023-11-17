import React from "react";
import styled from "styled-components";
import { useMainLayoutContext } from "../pages/MainLayout";
import LogoutContainer from "./LogoutContainer";
import SearchBar from "./SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #d70018;
  z-index: 99;
  height: 3.8rem;

  .nav-center {
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: space-between;
  }

  .search-bar {
    background: white;
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 0.75rem;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 0 0.5rem;
    width: 20vw;
    min-width: 50px;
  }

  .nav-links {
    display: flex;
    gap: 1.2rem;
  }
  .nav-link {
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  .icon {
    font-size: 1.8rem;
  }

  /* @media (min-width: 992px) {
    position: sticky;
    top: 0;
  } */
`;

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: 14,
    top: 18,
    padding: "0 4px",
    fontSize: "10px",
  },
}));

const Navbar = () => {
  const { toggleSideBar, user } = useMainLayoutContext();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <Wrapper>
      <div className="nav-center">
        <NavLink to="/">
          <Typography>Logo</Typography>
        </NavLink>

        <SearchBar />

        <div className="nav-links">
          <div className="nav-link" onClick={toggleSideBar}>
            <FormatAlignLeftOutlinedIcon />
            <Typography>Danh mục</Typography>
          </div>

          <NavLink className="nav-link" to="/cart">
            <StyledBadge badgeContent={cart.length > 0 && cart.length}>
              <HiOutlineShoppingBag className="icon" />
            </StyledBadge>
            <Typography>Giỏ hàng</Typography>
          </NavLink>
          {user ? (
            <LogoutContainer />
          ) : (
            <NavLink to="/login" className="nav-link">
              <AccountCircleIcon />
              <Typography>Đăng nhập</Typography>
            </NavLink>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
