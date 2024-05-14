import LogoutContainer from "./LogoutContainer";
import styled from "styled-components";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Drawer, Avatar, Badge } from "antd";
import { useDashboardContext } from "../pages/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";

const Wrapper = styled.nav`
  width: 100%;
  height: 60px;
  background: #212529;
  padding: 0 1rem;
  color: red;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  .nav-center {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-align: center;
  }
  .logout {
    height: 100%;
    display: grid;
    place-items: center;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  .notify {
    height: 50%;
    display: grid;
    place-items: center;
    margin-right: 20px;
    font-size: 23px;
    color: white;
    margin-top: 10px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleSidebar, newOrders } = useDashboardContext();
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState(newOrders);

  // fetch đơn hàng mới
  const fetchNewOrders = async () => {
    try {
      const newOrdersFetch = await customFetch
        .get("/order/?isSeen=false&&admin=true")
        .then(({ data }) => data);
      setOrders(newOrdersFetch);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNewOrders();
    }, 10000);

    // Cleanup để ngăn chặn việc gọi fetch khi component bị hủy
    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleClick = async (id) => {
    try {
      const order = await customFetch.patch(`/order/update/${id}`, {
        isSeen: true,
      });

      const newOrders = await customFetch
        .get("/order/?isSeen=false&&admin=true")
        .then(({ data }) => data);

      setOrders(newOrders);
      setOpen(false);

      if (order) navigate(`/edit-order/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="nav-center">
        {/* <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FormatAlignLeftOutlinedIcon />
        </button> */}

        <Badge className="notify" count={orders?.length}>
          <BellOutlined onClick={showDrawer} />
        </Badge>

        <Drawer title="Notification" onClose={onClose} open={open}>
          {orders.map((order) => {
            return (
              <div
                key={order._id}
                className="notification-item"
                style={{
                  cursor: "pointer",
                  width: "100%",
                  height: 80,
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: "500",
                  marginBottom: 10,
                  borderBottom: "1px solid #dedede",
                }}
                onClick={() => handleClick(order._id)}
              >
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  src={
                    order.user?.avatar ||
                    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  }
                />
                New order from {order.user.fullName}
              </div>
            );
          })}
        </Drawer>

        <div className="logout">
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
