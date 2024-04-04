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
import Logo from "../assets/LogoAdmin2.svg";
import styled from "styled-components";
import { useState } from "react";
import {
  SettingOutlined,
  LaptopOutlined,
  ShopOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
function getItem(label, key, icon, children, link) {
  return {
    key,
    icon,
    children,
    label,
    link,
  };
}
const items = [
  getItem("Dashboard", "1", <ShopOutlined />, null, "/add-product"),
  getItem(
    "Product",
    "sub1",
    <LaptopOutlined />,
    [
      getItem("All Product", "2", null, null, "/all-product"),
      getItem("Add Product", "3", null, null, "/add-product"),
      getItem("Detail Product", "4", null, null, "/add-product"),
    ],
    null
  ),
  getItem(
    "Category",
    "sub2",
    <ProfileOutlined />,
    [
      getItem("All Category", "5", null, null, "/add-category"),
      getItem("Add Category", "6", null, null, "/add-category"),
      getItem("Detail Category ", "7", null, null, "/add-category"),
    ],
    null
  ),
  getItem(
    "Coupon",
    "sub3",
    <DollarOutlined />,
    [
      getItem("All Coupon", "8", null, null, "/add-coupon"),
      getItem("Add Coupon", "9", null, null, "/add-coupon"),
      getItem("Detail Coupon", "10", null, null, "/add-coupon"),
    ],
    null
  ),
  getItem("Order", "11", <ShoppingCartOutlined />, null, "/add-product"),
  getItem("Customer", "12", <UserOutlined />, null, "/add-product"),
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        return func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);
const Wrapper = styled.aside`
  width: 256px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
  background-color: white;
  border: 1px solid lightgray;
  .sidebar-container {
    background-color: green;
    min-height: 100vh;
    height: 100%;
    width: 250px;
    margin-left: -410px;
    transition: margin-left 0.3s ease-in-out;
  }
  .top-sidebar {
    max-width: 256px;
    height: 60px;
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
  }
  .content {
    position: sticky;
    background-color: white;

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

  color: white;
  a {
    color: white;
  }
`;

const Sidebar = () => {
  // const { showSidebar } = useDashboardContext();

  // const [openDashboard, setOpenDashboard] = useState(false);
  // const [openProduct, setOpenProduct] = useState(false);
  // const [openCategory, setOpenCategory] = useState(false);
  // const [openCoupon, setOpenCoupon] = useState(false);

  // const handleClickOpenDashboard = () => {
  //   setOpenDashboard(!openDashboard);
  // };
  // const handleClickOpenProduct = () => {
  //   setOpenProduct(!openProduct);
  // };
  // const handleClickOpenCategory = () => {
  //   setOpenCategory(!openCategory);
  // };
  // const handleClickOpenCoupon = () => {
  //   setOpenCoupon(!openCoupon);
  // };
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <Wrapper>
      {/* <div
      // className={
      //   showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
      // }
      > */}

      <div className="content">
        <header className="top-sidebar">
          <NavLink to="/">
            <img style={{ width: 166, height: 50 }} src={Logo} />
          </NavLink>
        </header>

        {/* <List sx={{ width: "100%", maxWidth: 360, mt: 3 }}>
            <NavLink to="/" end>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardOutlinedIcon className="icon" />
                </ListItemIcon>
                Dashboard
              </ListItemButton>
            </NavLink>

            <ListItemButton onClick={handleClickOpenProduct}>
              <ListItemIcon>
                <ProductionQuantityLimitsOutlinedIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Product" />
              {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProduct} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink to="all-product" end>
                  <ListItemButton sx={{ pl: 8, m: 1 }}>
                    All Product
                  </ListItemButton>
                </NavLink>
                <NavLink to="add-product" end>
                  <ListItemButton sx={{ pl: 8, m: 1 }}>
                    Add Product
                  </ListItemButton>
                </NavLink>
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
                <NavLink to="all-category" end>
                  <ListItemButton sx={{ pl: 8, m: 1 }}>
                    All Category
                  </ListItemButton>
                </NavLink>
                <NavLink to="add-category" end>
                  <ListItemButton sx={{ pl: 8, m: 1 }}>
                    Add Category
                  </ListItemButton>
                </NavLink>
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
                <NavLink to="all-coupon" end>
                  <ListItemButton sx={{ pl: 8, m: 1 }}>
                    All Coupon
                  </ListItemButton>
                </NavLink>
                <NavLink to="add-coupon" end>
                  <ListItemButton sx={{ pl: 8, m: 1 }}>
                    Add Coupon
                  </ListItemButton>
                </NavLink>
              </List>
            </Collapse>

            <NavLink to="all-order" end>
              <ListItemButton>
                <ListItemIcon>
                  <CreditCardOutlinedIcon className="icon" />
                </ListItemIcon>
                Order
              </ListItemButton>
            </NavLink>

            <NavLink to="all-user" end>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineOutlinedIcon className="icon" />
                </ListItemIcon>
                Customer
              </ListItemButton>
            </NavLink>
          </List> */}
        <Menu
          mode="inline"
          defaultSelectedKeys={["231"]}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          style={{
            width: 256,
            backgroundColor: "white",
          }}
          // items={items}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key}>
                    <NavLink to={subItem.link}>{subItem.label}</NavLink>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <NavLink to={item.link}>{item.label}</NavLink>
              </Menu.Item>
            )
          )}
        </Menu>
      </div>
    </Wrapper>
  );
};
export default Sidebar;
