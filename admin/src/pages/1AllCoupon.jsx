import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Space, Table } from "antd";

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }

  .grid-center {
    display: grid;
    place-items: center;
  }
  .ed-btn {
    border: 1px solid #035ecf;
    border-radius: 3px;
    padding: 0 5px;
    color: #035ecf;
  }
  .md-font {
    font-size: 0.95rem;
  }
`;

export const loader = async () => {
  try {
    const coupons = await customFetch
      .get(`/coupon`)
      .then(({ data }) => data.coupons);
    return coupons;
  } catch (error) {
    return error;
  }
};

const AllCoupon = () => {
  const coupons = useLoaderData();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState(null);

  const handleClickOpen = (coupon) => {
    setOpen(true);
    setCoupon(coupon);
  };

  const handleClose = () => {
    setOpen(false);
    setCoupon(null);
  };

  const deleteCoupon = async (id) => {
    await customFetch.delete(`/coupon/delete/${id}`);
    console.log("deleted");
    navigate("/all-coupon");
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
      key: "expiry",
      render: (_, { expiry }) => (
        <span className="md-font">{expiry.split("T")[0]}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="ed-btn grid-center"
            onClick={() => navigate(`/edit-coupon/${record.name}`)}
          >
            Edit
          </a>
        </Space>
      ),
    },
  ];

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Coupon</title>
        </Helmet>

        <div className="title">All Coupon</div>

        <div style={{ width: "80%" }}>
          <Table columns={columns} dataSource={coupons} size="middle" />
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Chắc là xóa chưa?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không xóa</Button>
            <Button onClick={() => deleteCoupon(coupon._id)} autoFocus>
              Ừ xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllCoupon;
