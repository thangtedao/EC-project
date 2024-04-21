import React from "react";
import styled from "styled-components";
import Wrapper from "../../assets/wrappers/Navbar.js";
import { useMainLayoutContext } from "../../pages/MainLayout";
import LogoutContainer from "./LogoutContainer";
import SearchBar from "./SearchBar";
import { MdOutlineAccountCircle } from "react-icons/md";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import Logo from "../../assets/logo/Nova.svg";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: 13,
    top: 16,
    padding: "0 4px",
    fontSize: "10px",
  },
}));

const Navbar = () => {
  const { toggleSideBar } = useMainLayoutContext();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);

  return (
    <Wrapper>
      <div className="nav-center">
        <NavLink to="/">
          <img style={{ width: 140, height: 30 }} src={Logo} />
        </NavLink>

        <SearchBar />

        <div className="nav-links">
          <div className="nav-link" onClick={toggleSideBar}>
            <FormatAlignLeftOutlinedIcon className="icon" />
            Danh mục
          </div>

          <NavLink className="nav-link" to="/wishlist">
            <FaRegHeart className="icon" />
            Yêu Thích
          </NavLink>

          <NavLink className="nav-link" to="/cart">
            <StyledBadge badgeContent={cart?.length > 0 && cart.length}>
              <HiOutlineShoppingBag className="icon" />
            </StyledBadge>
            Giỏ hàng
          </NavLink>
          {user ? (
            <LogoutContainer />
          ) : (
            <NavLink to="/login" className="nav-link">
              <MdOutlineAccountCircle className="icon" />
              Đăng nhập
            </NavLink>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
