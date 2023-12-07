import React, { useState } from "react";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { ProductCard } from "../components";
import { createContext } from "react";
import { useContext } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Wrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 1550px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 1385px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 975px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const loader = async () => {
  try {
    const products = await customFetch
      .get(`/product`)
      .then(({ data }) => data.products);
    return products;
  } catch (error) {
    return error;
  }
};

const AllProductContext = createContext();

const AllProduct = () => {
  const products = useLoaderData();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [product, setproduct] = useState(null);

  const handleClickOpen = (product) => {
    setOpen(true);
    setproduct(product);
  };

  const handleClose = () => {
    setOpen(false);
    setproduct(null);
  };

  const deleteProduct = async (id) => {
    await customFetch.delete(`/product/${id}`);
    console.log("deleted");
    navigate("/all-product");
  };

  return (
    <AllProductContext.Provider value={{ handleClickOpen }}>
      <Wrapper>
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}

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
            <Button onClick={() => deleteProduct(product._id)} autoFocus>
              Ừ xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Wrapper>
    </AllProductContext.Provider>
  );
};

export const useAllProductContext = () => useContext(AllProductContext);
export default AllProduct;
