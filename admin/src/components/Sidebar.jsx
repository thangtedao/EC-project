import { useDashboardContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";

import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.aside`
  display: block;
  border: 1px solid black;

  .sidebar-container {
    background: var(--background-secondary-color);
    min-height: 100vh;
    height: 100%;
    width: 300px;
    margin-left: -410px;
    transition: margin-left 0.3s ease-in-out;
  }
  .content {
    position: sticky;
    top: 0;
  }
  .show-sidebar {
    margin-left: 0;
  }
  header {
    height: 6rem;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    padding-left: 2.5rem;
    text-transform: capitalize;
    transition: padding-left 0.3s ease-in-out;
  }
  .nav-link:hover {
    padding-left: 3rem;
    color: var(--primary-500);
    transition: var(--transition);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
  }
  .active {
    color: var(--primary-500);
  }
  .pending {
    background: var(--background-color);
  }
`;

const Sidebar = () => {
  const { showSidebar } = useDashboardContext();

  const [openDashboard, setOpenDashboard] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openCoupon, setOpenCoupon] = useState(false);

  const handleClickOpenDashboard = () => {
    setOpenDashboard(!openDashboard);
  };
  const handleClickOpenProduct = () => {
    setOpenProduct(!openProduct);
  };
  const handleClickOpenCategory = () => {
    setOpenCategory(!openCategory);
  };
  const handleClickOpenCoupon = () => {
    setOpenCoupon(!openCoupon);
  };

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>Logo</header>

          <List sx={{ width: "100%", maxWidth: 360 }}>
            <ListItemButton onClick={handleClickOpenDashboard}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
              {openDashboard ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openDashboard} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4, m: 1 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <NavLink to="" end>
                    Sales Analytics
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4, m: 1 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <NavLink to="" end>
                    Revenue By Period
                  </NavLink>
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClickOpenProduct}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Product" />
              {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProduct} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4, m: 1 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <NavLink to="all-product" end>
                    All Product
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4, m: 1 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <NavLink to="add-product" end>
                    Add Product
                  </NavLink>
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClickOpenCategory}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
              {openCategory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <NavLink to="all-category" end>
                    All Category
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <NavLink to="add-category" end>
                    Add Category
                  </NavLink>
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClickOpenCoupon}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Coupon" />
              {openCoupon ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCoupon} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <NavLink to="all-coupon" end>
                    All Coupon
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <NavLink to="add-coupon" end>
                    Add Coupon
                  </NavLink>
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <NavLink to="all-order" end>
                Order
              </NavLink>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <NavLink to="add-user" end>
                Customer
              </NavLink>
            </ListItemButton>
          </List>
        </div>
      </div>
    </Wrapper>
  );
};
export default Sidebar;
