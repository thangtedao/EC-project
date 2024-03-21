import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";
import img from "../assets/react.svg";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Space, Table, Image } from "antd";

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1.5rem;
  }

  .grid-center {
    display: grid;
    place-items: center;
  }
  .btn {
    width: 75px;
    height: 28px;
    border-radius: 5px;
    background-color: #035ecf;
    color: white;
    font-weight: bolder;
  }
  .ed-btn {
    border: 1px solid #035ecf;
    border-radius: 3px;
    padding: 0 5px;
    color: #035ecf;
  }
  .dl-btn {
    border: 1px solid #ff5470;
    border-radius: 3px;
    padding: 0 5px;
    color: #ff5470;
  }
  .md-font {
    font-size: 0.95rem;
  }
`;

export const loader = async () => {
  try {
    const users = await customFetch
      .get(`/user/all-users`)
      .then(({ data }) => data.users);
    return users;
  } catch (error) {
    return error;
  }
};

const AllUser = () => {
  const users = useLoaderData();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleClickOpen = (user) => {
    setOpen(true);
    setUser(user);
  };

  const handleClose = () => {
    setOpen(false);
    setUser(null);
  };

  const blockUser = async (id) => {
    await customFetch.patch(`/user/block-user/${id}`);
    console.log("blocked");
    navigate("/all-user");
  };

  const unBlockUser = async (id) => {
    await customFetch.patch(`/user/unblock-user/${id}`);
    console.log("unblocked");
    navigate("/all-user");
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, { avatar }) => (
        <>
          {avatar ? (
            <Image width={45} src={avatar} />
          ) : (
            <Image width={45} src={img} />
          )}
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, { address }) => (
        <span className="md-font">{address.city}</span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Registered",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 100,
      render: (_, { createdAt }) => (
        <span className="md-font">{createdAt.split("T")[0]}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="ed-btn grid-center"
            onClick={() => navigate(`/edit-user/${record._id}`)}
          >
            View
          </a>
          {record.isBlocked ? (
            <a
              className="dl-btn grid-center"
              onClick={() => handleClickOpen(record)}
            >
              UnBlock
            </a>
          ) : (
            <a
              className="dl-btn grid-center"
              onClick={() => handleClickOpen(record)}
            >
              Block
            </a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>User</title>
        </Helmet>

        <div className="title">User</div>
        <div style={{ width: "80%" }}>
          <Table columns={columns} dataSource={users} size="middle" />
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {user && user.isBlocked ? "Ublock User?" : "Block User?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          {user && user.isBlocked ? (
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => unBlockUser(user._id)} autoFocus>
                UnBlock
              </Button>
            </DialogActions>
          ) : (
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => blockUser(user._id)} autoFocus>
                Block
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllUser;
