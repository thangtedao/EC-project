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
    border: transparent;
    color: #035ecf;
    :hover {
      background-color: #035ecf;
      color: white;
    }
  }
  .dl-btn {
    border: transparent;
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

        <div
          style={{
            width: "80%",
            display: "flex",
            padding: "2rem 1rem",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          {categories.map((parentCategory) => {
            return (
              !parentCategory.parent && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    paddingBottom: "0.3rem",
                    borderBottom: "1px solid lightgray",
                  }}
                  key={parentCategory._id}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 3fr 1fr 1fr",
                      columnGap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {"+ " + parentCategory.name}
                    </div>
                    <div style={{ marginLeft: "1.6rem" }}>
                      {parentCategory.description.length > 50
                        ? parentCategory.description.slice(0, 50) + "..."
                        : parentCategory.description}
                    </div>
                    <div style={{ marginLeft: "0.65rem" }}>
                      {count.map((item) => {
                        return (
                          parentCategory?.slug?.toString() ===
                            item?._id?.toString() && item.count
                        );
                      })}
                    </div>
                    <div style={{ marginLeft: "0.4rem" }}>
                      <button
                        className="ed-btn"
                        onClick={() =>
                          navigate(`/edit-category/${parentCategory.slug}`)
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  {categories.map((childCategory) => {
                    if (
                      childCategory.parent &&
                      childCategory.parent.slug === parentCategory.slug
                    ) {
                      return (
                        <div
                          style={{
                            marginLeft: "2rem",
                            display: "grid",
                            gridTemplateColumns: "1fr 3fr 1fr 1fr",
                            columnGap: "1rem",
                            alignItems: "center",
                          }}
                          key={childCategory._id}
                        >
                          <div>{childCategory.name}</div>
                          <div>
                            {childCategory.description.length > 50
                              ? childCategory.description.slice(0, 50) + "..."
                              : childCategory.description}
                          </div>
                          <div>
                            {count.map((item) => {
                              return (
                                childCategory?.slug?.toString() ===
                                  item?._id?.toString() && item.count
                              );
                            })}
                          </div>
                          <div>
                            <button
                              className="ed-btn"
                              onClick={() =>
                                navigate(`/edit-category/${childCategory.slug}`)
                              }
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )
            );
          })}
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
