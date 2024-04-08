import { NavLink } from "react-router-dom";
import Logo from "../assets/LogoAdmin2.svg";
import styled from "styled-components";
import { useState } from "react";
import {
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
      getItem("Detail Product", "4", null, null, null),
    ],
    null
  ),
  getItem(
    "Category",
    "sub2",
    <ProfileOutlined />,
    [
      getItem("All Category", "5", null, null, "/all-category"),
      getItem("Add Category", "6", null, null, "/add-category"),
      getItem("Detail Category ", "7", null, null, null),
    ],
    null
  ),
  getItem(
    "Coupon",
    "sub3",
    <DollarOutlined />,
    [
      getItem("All Coupon", "8", null, null, "/all-coupon"),
      getItem("Add Coupon", "9", null, null, "/add-coupon"),
      getItem("Detail Coupon", "10", null, null, null),
    ],
    null
  ),
  getItem("Order", "11", <ShoppingCartOutlined />, null, "/all-order"),
  getItem("Customer", "12", <UserOutlined />, null, "/all-user"),
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
  width: 255px;
  height: 100vh;
  position: fixed;
  background-color: white;
  border: 1px solid lightgray;
  overflow: hidden;

  .top-sidebar {
    max-width: 255px;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
    border-bottom: 1px solid lightgray;
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
      <header className="top-sidebar">
        <NavLink to="/">
          <img style={{ height: 50 }} src={Logo} />
        </NavLink>
      </header>

      <Menu
        mode="inline"
        defaultSelectedKeys={["231"]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 255,
          backgroundColor: "white",
          paddingTop: "1rem",
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
    </Wrapper>
  );
};
export default Sidebar;
