import React from "react";
import styled from "styled-components";
import { useMainLayoutContext } from "../pages/MainLayout";
import LogoutContainer from "./LogoutContainer";
import SearchBar from "./SearchBar";
import { MdOutlineAccountCircle } from "react-icons/md";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";

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
    font-size: 1.6rem;
  }

  /* @media (min-width: 992px) {
    position: sticky;
    top: 0;
  } */
`;

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: 13,
    top: 16,
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
            <FormatAlignLeftOutlinedIcon className="icon" />
            <Typography>Danh mục</Typography>
          </div>

          <NavLink className="nav-link" to="/wishlist">
            <FaRegHeart className="icon" />
            <Typography>Yêu Thích</Typography>
          </NavLink>

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
              <MdOutlineAccountCircle className="icon" />
              <Typography>Đăng nhập</Typography>
            </NavLink>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
