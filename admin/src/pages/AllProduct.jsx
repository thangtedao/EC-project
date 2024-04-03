import React, { useState } from "react";
import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import { ProductCard } from "../components/index.js";
import { createContext } from "react";
import { useContext } from "react";
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import { PRODUCT_STATUS } from "../utils/constants.js";

// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { EditOutlined, AudioOutlined, PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Table, Image, Button, Input, Space } from "antd";

const Wrapper = styled.div`
  width: 100%;

  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }

  .table {
    width: 1200px;
  }
  .ant-table {
    border: 1px solid lightgray;
    border-radius: 2px;
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

const AllProduct = () => {
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
  const { Search } = Input;
  //Search Product
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );
  //Danh sách các cột
  const columns = [
    {
      title: "Image",
      width: 150,
      dataIndex: "image",
      key: "image",
      fixed: "left",
      render: (image) => <Image width={100} height={100} src={image} />,
    },
    {
      title: "Name",
      width: 300,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        {
          text: "Laptop",
          value: "Laptop",
        },
        {
          text: "Phone",
          value: "Phone",
        },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sale Price",
      dataIndex: "saleprice",
      key: "saleprice",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Available",
          value: "Available",
        },
        {
          text: "Out of stock",
          value: "Out of stock",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sold - b.sold,
    },
    // {
    //   title: "Action",
    //   key: "operation",
    //   fixed: "right",
    //   width: 100,
    //   render: () => <a>Edit</a>,
    // },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <Button icon={<EditOutlined />}>Edit</Button>,
    },
  ];
  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  //Data table
  const data = [
    {
      image:
        "https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-14-pre-trang.png",
      name: "Xiaomi 14 12GB 256GB",
      category: "Phone",
      price: "16.000.000",
      saleprice: "15.000.000",
      status: "Available",
      sold: "5",
    },
    {
      image:
        "https://cdn2.cellphones.com.vn/x/media/catalog/product/t/e/text_ng_n_15__7_14.png",
      name: "Xiaomi 14 12GB 256GB",
      category: "Laptop",
      price: "16.000.000",
      saleprice: "15.000.000",
      status: "Out of stock",
      sold: "4",
    },
    {
      image:
        "https://cdn2.cellphones.com.vn/x/media/catalog/product/t/e/text_ng_n_15__7_14.png",
      name: "Xiaomi 14 12GB 256GB",
      category: "Phone",
      price: "16.000.000",
      saleprice: "15.000.000",
      status: "Out of stock",
      sold: "6",
    },
    {
      image:
        "https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-14-pre-trang.png",
      name: "Xiaomi 14 12GB 256GB",
      category: "Phone",
      price: "16.000.000",
      saleprice: "15.000.000",
      status: "Available",
      sold: "2",
    },
  ];
  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <AllProductContext.Provider value={{ handleClickOpen }}>
      <HelmetProvider>
        <Wrapper>
          <Helmet>
            <meta charSet="utf-8" />
            <title>All Product</title>
          </Helmet>
          <Breadcrumb
            style={{ paddingBottom: "1rem" }}
            items={[
              {
                title: <a href="/">Dashboard</a>,
              },
              {
                title: "Product",
              },
            ]}
          />
          <div className="title">Product</div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Search
              size="large"
              placeholder="Enter search name"
              allowClear
              onSearch={onSearch}
              style={{
                width: "30%",
              }}
            />
            <div style={{ flex: "0 0 auto" }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                style={{ width: "100%" }}
              >
                Add Product
              </Button>
            </div>
          </div>
          <Button size="large" style={{ marginBottom: 20 }}>
            Reload
          </Button>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "1.5rem",
              marginBottom: "4rem",
            }}
          >
            <Table
              className="table"
              columns={columns}
              dataSource={data}
              onChange={onChange}
              showSorterTooltip={{
                target: "sorter-icon",
              }}
            />
          </div>
          {/* <Form className="filter-bar">
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
          </Form> */}

          {/* <div className="product-grid">
            {products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div> */}
          {/* 
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
          </Dialog> */}
        </Wrapper>
      </HelmetProvider>
    </AllProductContext.Provider>
  );
};

export const useAllProductContext = () => useContext(AllProductContext);
export default AllProduct;
