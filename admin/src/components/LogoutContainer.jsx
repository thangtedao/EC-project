import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import customFetch from "../utils/customFetch";
import { logout } from "../state/userSlice";

// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Tooltip from "@mui/material/Tooltip";
// import Logout from "@mui/icons-material/Logout";

import { Avatar, Space, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Wrapper = styled.div`
  position: relative;
  .logout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    border-radius: var(--border-radius);
    background: green;
    visibility: hidden;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--white);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;

const LogoutContainer = () => {
  // const [showLogout, setShowLogout] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    await customFetch.get("/auth/logout");
    dispatch(logout());
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const items = [
    {
      label: <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Logout</a>,
      key: "0",
    },
    {
      label: <div onClick={() => logoutUser()}>Logout</div>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
    <Wrapper>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <Avatar
          size="large"
          icon={<UserOutlined src={user?.avatar && user.avatar} />}
        >
          {!user?.avatar && user?.fullName.charAt(0).toUpperCase()}
        </Avatar>
      </Dropdown>
    </Wrapper>
  );
};

export default LogoutContainer;
