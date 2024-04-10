import React, { useState } from "react";
import customFetch from "../../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";
import { PRODUCT_STATUS } from "../../utils/constants.js";

import {
  EditOutlined,
  AudioOutlined,
  PlusOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Table, Image, Button, Input, Dropdown } from "antd";

const Wrapper = styled.div`
  width: 100%;

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

    const products = await customFetch
      .get(`/product/?populate=category,brand`)
      .then(({ data }) => data);

    const categories = await customFetch
      .get("/category/all-categories")
      .then(({ data }) => data);

    const brands = await customFetch
      .get("/brand/all-brands")
      .then(({ data }) => data);

    return { products, categories, brands };
  } catch (error) {
    return error;
  }
};

const DashboardProduct = () => {
  const { products, categories, brands } = useLoaderData();
  const navigate = useNavigate();

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  //Dropdown
  const items = [
    {
      label: "View",
      key: "1",
      icon: <FormOutlined />,
      // onClick: () => handleAddProduct(),
    },
  ];

  //Danh sách các cột
  const columns = [
    {
      title: "Image",
      width: 100,
      dataIndex: "images",
      key: "images",
      // fixed: "left",
      render: (images) => <Image width={100} height={100} src={images[0]} />,
    },
    {
      title: "Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      // fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      filters: Object.keys(PRODUCT_STATUS).map((key) => {
        return {
          text: PRODUCT_STATUS[key],
          value: PRODUCT_STATUS[key],
        };
      }),
      onFilter: (value, record) => record?.status === value,
    },

    {
      title: "Action",
      key: "operation",
      // fixed: "right",
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
  //CheckBox
  const [selectionType] = useState("checkbox");

  return (
    <HelmetProvider>
      <Wrapper>
        <Table
          className="table"
          style={{ border: "none" }}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          pagination={paginationConfig}
          columns={columns}
          dataSource={products?.map((product) => ({
            ...product,
            key: product._id,
          }))}
          onChange={onChange}
          // scroll={{ x: 600 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default DashboardProduct;
