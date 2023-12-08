import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
    width: 90%;
    margin-top: 1rem;
    border-collapse: collapse;
  }
  th {
    /* border: 1px solid lightgray; */
    height: 20px;
  }
  tr {
    border: 1px solid lightgray;
  }
  td {
    /* border: 1px solid lightgray; */
    height: 30px;
  }
  th,
  td {
    text-align: left;
    padding: 10px 20px;
  }

  td:nth-last-child(-n + 2) {
    width: 55px;
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
    const response = await customFetch.get(`/category/?populate=parent`);

    return {
      categories: response.data.categories,
      count: response.data.itemsPerCate,
    };
  } catch (error) {
    return error;
  }
};

const AllCategory = () => {
  const { categories, count } = useLoaderData();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);

  const handleClickOpen = (category) => {
    setOpen(true);
    setCategory(category);
  };

  const handleClose = () => {
    setOpen(false);
    setCategory(null);
  };

  const deleteCategory = async (id) => {
    await customFetch.delete(`/category/delete/${id}`);
    console.log("deleted");
    navigate("/all-category");
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Category</title>
        </Helmet>

        <div className="title">All Category</div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Items</th>
              <th>Parent</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>
                    {category.description.length > 50
                      ? category.description.slice(0, 50) + "..."
                      : category.description}
                  </td>
                  <td>
                    {count.map((item) => {
                      return (
                        category?.slug?.toString() === item?._id?.toString() &&
                        item.count
                      );
                    })}
                  </td>
                  <td>{category.parent?.name}</td>
                  <td>
                    <button
                      className="ed-btn"
                      onClick={() =>
                        navigate(`/edit-category/${category.slug}`)
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="dl-btn"
                      onClick={() => handleClickOpen(category)}
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
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose}>Không xóa</Button>
            <Button onClick={() => deleteCategory(category._id)} autoFocus>
              Ừ xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllCategory;
