import React, { useState } from "react";
import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import { PRODUCT_STATUS } from "../utils/constants.js";

import {
  EditOutlined,
  AudioOutlined,
  PlusOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Table, Image, Button, Input, Dropdown } from "antd";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }

  .table {
    width: 100%;
  }
  .ant-table {
    border: 1px solid lightgray;
    border-radius: 2px;
  }
`;
//Select row
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  // Column configuration not to be checked
  getCheckboxProps: (record) => ({
    disabled: record.status === "Out of stock",
    status: record.status,
  }),
};
export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    if (params && params.category === "all") {
      delete params.category;
    }

    const products = await customFetch
      .get(`/product/?populate=category,brand`)
      .then(({ data }) => data);

    const categories = await customFetch
      .get("/category/all-categories")
      .then(({ data }) => data);

    const brands = await customFetch
      .get("/brand/all-brands")
      .then(({ data }) => data);

    return { products, categories, brands, searchParams: { ...params } };
  } catch (error) {
    return error;
  }
};

const AllProduct = () => {
  const { products, categories, brands, searchParams } = useLoaderData();
  const { category, status } = searchParams;
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate("/add-product");
  };
  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };
  const handleReloadClick = () => {
    navigate("/all-product");
  };
  //Search Product
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );

  //Dropdown
  const items = [
    {
      label: "View",
      key: "1",
      icon: <FormOutlined />,
      onClick: () => handleAddProductClick(),
    },
  ];

  //Danh sách các cột
  const columns = [
    {
      title: "Image",
      width: 120,
      dataIndex: "images",
      key: "images",
      fixed: "left",
      render: (images) => <Image width={100} height={100} src={images[0]} />,
    },
    {
      title: "Name",
      width: 250,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (category) => {
        return category?.map((item) => <div key={item._id}>{item?.name}</div>);
      },
      filters: categories?.map((category) => {
        return {
          text: category?.name,
          value: category?._id,
        };
      }),
      onFilter: (value, record) =>
        record?.category?.some((cat) => cat?._id === value),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 150,
      render: (brand) => brand?.name,
      filters: brands?.map((brand) => {
        return {
          text: brand?.name,
          value: brand?._id,
        };
      }),
      onFilter: (value, record) => record?.brand?._id === value,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (value) =>
        value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
      width: 150,
      render: (value) =>
        value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      filters: Object.keys(PRODUCT_STATUS).map((key) => {
        return {
          text: PRODUCT_STATUS[key],
          value: PRODUCT_STATUS[key],
        };
      }),
      onFilter: (value, record) => record?.status === value,
    },
    // {
    //   title: "Sold",
    //   dataIndex: "sold",
    //   key: "sold",
    //   width: 100,
    //   defaultSortOrder: "descend",
    //   sorter: (a, b) => a.sold - b.sold,
    // },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: ({ _id }) => (
        <Dropdown.Button
          onClick={() => handleEditProduct(_id)}
          menu={{
            items,
          }}
        >
          <EditOutlined />
          Edit
        </Dropdown.Button>
      ),
    },
  ];
  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // Số lượng sản phẩm trên mỗi trang
  const paginationConfig = {
    pageSize: 5,
  };
  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //CheckBox
  const [selectionType] = useState("checkbox");

  return (
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
              minWidth: 300,
            }}
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ width: 150 }}
            onClick={handleAddProductClick}
          >
            Add Product
          </Button>
        </div>

        <Button
          size="large"
          style={{ marginBottom: 20, width: 100 }}
          onClick={handleReloadClick}
        >
          Reload
        </Button>

        <Table
          className="table"
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          pagination={paginationConfig}
          columns={columns}
          dataSource={products.map((product) => ({
            ...product,
            key: product._id,
          }))}
          onChange={onChange}
          scroll={{ x: 1200 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
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
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllProduct;
