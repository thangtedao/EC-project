import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AudioOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import { Card, Table, Image, Input, Dropdown, Tag } from "antd";
import { PRODUCT_STATUS } from "../../utils/constants";

const Wrapper = styled.div`
  width: 100%;
  .col-1 {
    width: 100%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .table {
    width: 100%;
  }
  .ant-table {
    border: 1px solid lightgray;
    border-radius: 2px;
  }
  .ant-card-head-title {
    text-align: left;
  }
`;

const EventProduct = ({
  products,
  categories,
  selectedProductIds,
  setSelectedProductIds,
  setSelectedProducts,
}) => {
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
      onClick: () => console.log("View"),
    },
  ];

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //CheckBox
  const [selectionType] = useState("checkbox");

  //Danh sách các cột A
  const columns = [
    {
      title: "Image",
      width: 100,
      dataIndex: "images",
      key: "images",
      fixed: "left",
      render: (images) => <Image width={80} height={80} src={images[0]} />,
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (value) =>
        value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
      width: 150,
      render: (value) =>
        value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => {
        let color = "";
        if (status === "Available") {
          color = "green";
        } else if (status === "Out of stock") {
          color = "orange";
        } else if (status === "Discontinued") {
          color = "red";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: Object.keys(PRODUCT_STATUS).map((key) => {
        return {
          text: PRODUCT_STATUS[key],
          value: PRODUCT_STATUS[key],
        };
      }),
      onFilter: (value, record) => record?.status === value,
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      width: 100,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sold - b.sold,
    },
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

  const rowSelection = {
    selectedRowKeys: selectedProductIds,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedProducts(selectedRows);
      setSelectedProductIds(selectedRowKeys);
    },
    //Ko thể chọn sp out of stock
    getCheckboxProps: (record) => ({
      disabled: record.status === "Out of stock",
      status: record.status,
    }),
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

  return (
    <Wrapper>
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
      </div>
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
        <Card className="col-1-item" size="large" title={`All Product`}>
          <Table
            className="table"
            rowSelection={{ type: "checkbox", ...rowSelection }}
            columns={columns}
            dataSource={products.map((product) => ({
              ...product,
              key: product._id,
            }))}
            showSorterTooltip={{ target: "sorter-icon" }}
          />
        </Card>
      </div>
    </Wrapper>
  );
};

export default EventProduct;
