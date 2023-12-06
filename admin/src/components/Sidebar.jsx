import { useDashboardContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";

import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import Logo from "../assets/Nova.svg";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.aside`
  display: block;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);

  .sidebar-container {
    background-color: #3d464d;
    min-height: 100vh;
    height: 100%;
    width: 250px;
    margin-left: -410px;
    transition: margin-left 0.3s ease-in-out;
  }
  .top-sidebar {
    height: 60px;
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
    color: white;
  }
  .active {
    color: var(--primary-500);
  }
  .pending {
    background: var(--background-color);
  }

  color: white;
  a {
    color: white;
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
          <header className="top-sidebar">
            <NavLink to="/">
              <img style={{ width: 140, height: 30 }} src={Logo} />
            </NavLink>
          </header>

          <List sx={{ width: "100%", maxWidth: 360, mt: 3 }}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardOutlinedIcon className="icon" />
              </ListItemIcon>
              <NavLink to="/" end>
                Dashboard
              </NavLink>
            </ListItemButton>

            <ListItemButton onClick={handleClickOpenProduct}>
              <ListItemIcon>
                <ProductionQuantityLimitsOutlinedIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Product" />
              {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProduct} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 8, m: 1 }}>
                  <NavLink to="all-product" end>
                    All Product
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ pl: 8, m: 1 }}>
                  <NavLink to="add-product" end>
                    Add Product
                  </NavLink>
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClickOpenCategory}>
              <ListItemIcon>
                <CategoryOutlinedIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Category" />
              {openCategory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 8, m: 1 }}>
                  <NavLink to="all-category" end>
                    All Category
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ pl: 8, m: 1 }}>
                  <NavLink to="add-category" end>
                    Add Category
                  </NavLink>
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClickOpenCoupon}>
              <ListItemIcon>
                <DiscountOutlinedIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Coupon" />
              {openCoupon ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCoupon} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 8, m: 1 }}>
                  <NavLink to="all-coupon" end>
                    All Coupon
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ pl: 8, m: 1 }}>
                  <NavLink to="add-coupon" end>
                    Add Coupon
                  </NavLink>
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton>
              <ListItemIcon>
                <CreditCardOutlinedIcon className="icon" />
              </ListItemIcon>
              <NavLink to="all-order" end>
                Order
              </NavLink>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon className="icon" />
              </ListItemIcon>
              <NavLink to="all-user" end>
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
