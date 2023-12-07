import React from "react";
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
import { useState } from "react";

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

  table {
    background-color: white;
    width: 100%;
    margin-top: 1rem;
    border-collapse: collapse;
  }
  th {
    /* border: 1px solid lightgray; */
    height: 40px;
  }
  tr {
    border: 1px solid lightgray;
  }
  td {
    /* border: 1px solid lightgray; */
    height: 60px;
  }
  th,
  td {
    text-align: left;
    padding: 5px 0;
  }

  td:nth-last-child(-n + 2) {
    width: 85px;
  }

  th:first-child {
    padding-left: 10px;
  }
  td:first-child {
    display: grid;
    place-items: center;
    padding: 0;
    width: 60px;
  }
  .avatar {
    height: 50px;
    width: 50px;
    border-radius: 5px;
    overflow: hidden;
    display: grid;
    place-items: center;
    img {
      max-width: 50px;
      height: inherit;
    }
  }

  button {
    width: 80px;
    font-weight: bolder;
    border-radius: 23px;
    background: white;
    height: 30px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  .ed-btn {
    border: 2px solid #035ecf;
    color: #035ecf;
    :hover {
      background-color: #035ecf;
      color: white;
    }
  }
  .dl-btn {
    border: 2px solid #ff5470;
    color: #ff5470;
    :hover {
      background-color: #ff5470;
      color: white;
    }
  }
  @media (max-width: 1550px) {
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

  const deleteUser = async (id) => {
    await customFetch.delete(`/user/delete/${id}`);
    console.log("deleted");
    navigate("/all-user");
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>User</title>
        </Helmet>

        <div className="title">User</div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Live in</th>
              <th>Role</th>
              {/* <th>Blocked</th> */}
              <th>Registered</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              return (
                <tr key={user._id}>
                  <td>
                    <div className="avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt="avatar" />
                      ) : (
                        <img src={img} alt="avatar" />
                      )}
                    </div>
                  </td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address.city}</td>
                  <td>{user.role}</td>
                  {/* <td>{user.isBlocked.toString()}</td> */}
                  <td>{user.createdAt.split("T")[0]}</td>
                  <td>
                    <button
                      className="ed-btn"
                      onClick={() => navigate(`/edit-user/${user._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="dl-btn"
                      onClick={() => handleClickOpen(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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
            <DialogContentText id="alert-dialog-description">
              Xóa là bay database
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không xóa</Button>
            <Button onClick={() => deleteUser(user._id)} autoFocus>
              Ừ xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllUser;
