import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Logo from "../assets/logo/NovaCoupon.svg";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FileCopyOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { Input } from "antd";
const Wrapper = styled.div`
  width: 1100px;
  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .input-title {
    font-size: 5rem;
    font-weight: 1000;
  }
  /* .col-1 {
    width: 60%;
    height: fit-content;
  }
  .col-2 {
    width: 40%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  } */
  .list-coupon {
    width: 90%;
    margin: 0 auto;
  }
  .copy-button-container {
    position: absolute;
    top: 50%; /* Đẩy nút lên trên 50% của phần tử cha */
    transform: translateY(-50%); /* Dịch chuyển nút lên trên để căn giữa */
    right: 0;
    margin-right: 10px;
  }
`;
const Coupon = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };
  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Coupon</title>
        </Helmet>

        <div
          style={{
            width: "30%",
            margin: "0 auto",
            marginBottom: "20px",
            marginTop: "30px",
          }}
        >
          <Search
            placeholder="Search coupon"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <div style={{ width: "100%" }}>
          <div className="list-coupon">
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={Logo}
                    sx={{
                      borderRadius: 0,
                      width: "70px",
                      height: "70px",
                      marginRight: "5px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="SALE10"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Giảm 100% giá trị mặt hàng ko bán nữa ok?
                      </Typography>

                      {"10/5/2024 - 25/5/2024  "}
                    </React.Fragment>
                  }
                />
                <div className="copy-button-container">
                  <Button
                    onClick={() => handleCopy("SALE10")}
                    startIcon={<FileCopyOutlined />}
                    variant="text"
                  >
                    Copy
                  </Button>
                </div>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={Logo}
                    sx={{
                      borderRadius: 0,
                      width: "70px",
                      height: "70px",
                      marginRight: "5px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="SALE05"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Giảm 100% giá trị mặt hàng ko bán nữa ok?
                      </Typography>

                      {"10/5/2024 - 25/5/2024  "}
                    </React.Fragment>
                  }
                />
                <div className="copy-button-container">
                  <Button
                    onClick={() => handleCopy("SALE05")}
                    startIcon={<FileCopyOutlined />}
                    variant="text"
                  >
                    Copy
                  </Button>
                </div>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Coupon;
