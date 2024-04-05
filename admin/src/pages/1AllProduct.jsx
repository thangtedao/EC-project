import React, { useState } from "react";
import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import { ProductCard } from "../components/index.js";
import { createContext } from "react";
import { useContext } from "react";
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import { PRODUCT_STATUS } from "../utils/constants.js";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .filter-bar {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
  }

  .product-grid {
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
  }

  .form-filter {
    width: fit-content;
    display: flex;
    gap: 0.3rem;

    .form-filter-label {
      display: grid;
      place-items: center;
      height: 30px;
      font-size: 0.9rem;
      font-weight: bold;
      color: #00193b;
    }
    .form-filter-select {
      height: 30px;
      border: 1px solid #e2e1e1;
      border-radius: 8px;
    }
  }

  .btn {
    width: 75px;
    height: 28px;
    border-radius: 10px;
    background-color: #035ecf;
    color: white;
    font-weight: bolder;
  }
`;

export const loader = async ({ request }) => {
  try {
    console.log(request.url);
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    if (params && params.category === "all") {
      delete params.category;
    }
    console.log(params);

    const products = await customFetch
      .get(`/product`, { params })
      .then(({ data }) => data.products);

    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data.categories);

    return { products, categories, searchParams: { ...params } };
  } catch (error) {
    return error;
  }
};

const AllProductContext = createContext();

const AllProduct1 = () => {
  const { products, categories, searchParams } = useLoaderData();
  const { category, status } = searchParams;
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
      <HelmetProvider>
        <Wrapper>
          <Helmet>
            <meta charSet="utf-8" />
            <title>All Product</title>
          </Helmet>

          <Form className="filter-bar">
            <div className="form-filter">
              <label htmlFor="category" className="form-filter-label">
                Category
              </label>
              <select
                name="category"
                className="form-filter-select"
                defaultValue={category || "all"}
              >
                <option value="all">All</option>
                {categories.map((item) => {
                  return (
                    <option key={item._id} value={item.slug}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-filter">
              <label htmlFor="status" className="form-filter-label">
                Status
              </label>
              <select
                name="status"
                className="form-filter-select"
                defaultValue={status || "all"}
              >
                <option value="all">All</option>
                <option value="available">Sẵn Hàng</option>
                <option value="outOfStock">Hết Hàng</option>
                <option value="discontinued">Ngưng Bán</option>
                <option value="most-buy">Mua Nhiều Nhất</option>
                <option value="less-buy">Ế Nhất</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Apply
            </button>
          </Form>

          <div className="product-grid">
            {products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
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
              <Button onClick={handleClose}>Không xóa</Button>
              <Button onClick={() => deleteProduct(product._id)} autoFocus>
                Ừ xóa
              </Button>
            </DialogActions>
          </Dialog>
        </Wrapper>
      </HelmetProvider>
    </AllProductContext.Provider>
  );
};

export const useAllProductContext = () => useContext(AllProductContext);
export default AllProduct1;
