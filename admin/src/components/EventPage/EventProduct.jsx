import React, { useState } from "react";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { useNavigate, useLoaderData } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import { Card, Table, Image, Button, Form, Input } from "antd";

const Wrapper = styled.div`
  width: 100%;
  .col-1 {
    width: 60%;
    height: fit-content;
  }
  .col-2 {
    width: 40%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
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

const EventProduct = ({ products }) => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [dataSourceB, setDataSourceB] = useState([]);
  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //CheckBox
  const [selectionType] = useState("checkbox");

  //Danh sách các cột A
  const columnsA = [
    {
      title: "Image",
      width: 110,
      dataIndex: "images",
      key: "images",
      fixed: "left",
      // render: (images) => <Image width={100} height={100} src={images[0]} />,
    },
    {
      title: "Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      // filters:
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      // filters:
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      // sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      // sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // filters:
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 80,
      render: ({ _id }) => (
        <Button onClick={() => transferSelectedItems()}>Add</Button>
      ),
    },
  ];
  //Data A
  const dataSourceA = [
    {
      key: "1",
      category: "1",
      name: "Mike",
      price: 32,
      sold: "10 Downing Street",
    },
    {
      key: "2",
      category: "2",
      name: "John",
      price: 42,
      sold: "10 Downing Street",
    },
  ];

  //Danh sách các cột B
  const columnsB = [
    {
      title: "Image",
      width: 110,
      dataIndex: "images",
      // render: (images) => <Image width={100} height={100} src={images[0]} />,
    },
    {
      title: "Name",
      width: 130,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Action",
      key: "operation",
      width: 80,
      fixed: "right",

      render: ({ _id }) => (
        <Button onClick={() => removeSelectedItems()}>Delete</Button>
      ),
    },
  ];

  // check sp xem đã có ở bảng B thì không thể thêm  sp đó A từ vào B nữa
  const transferSelectedItems = () => {
    // Kiểm tra xem các mục đã được chọn có tồn tại trong Bảng B chưa
    const selectedProductsToAdd = selectedProducts.filter(
      (product) => !dataSourceB.find((item) => item.key === product.key)
    );

    // Thêm các mục chưa tồn tại vào Bảng B
    setDataSourceB((prevDataSource) => [
      ...prevDataSource,
      ...selectedProductsToAdd,
    ]);
    // Xóa lựa chọn sau khi chuyển
    setSelectedProducts([]);
  };

  //Hàm chọn sp bảng A
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        // selectedRows
        setSelectedProducts(selectedRows)
      );
    },
    //Ko thể chọn sp out of stock
    getCheckboxProps: (record) => ({
      disabled: record.status === "Out of stock",
      status: record.status,
    }),
  };

  //Hàm chọn sp bảng B
  const rowSelectionB = {
    onChange: (selectedRowKeys, selectedRows) => {
      // Xử lý sự kiện khi có sự thay đổi trong việc chọn hàng trong Bảng B
      console.log("Selected row keys:", selectedRowKeys);
      console.log("Selected rows:", selectedRows);
      setSelectedProducts(selectedRows);
    },
  };

  //Xóa sp ở bảng B - Hiện đang bị lỗi xóa ở B xong không thể thêm lại trong 1 số trường hợp - ib Vy để biết thêm
  const removeSelectedItems = () => {
    const updatedDataSourceB = dataSourceB.filter(
      (item) => !selectedProducts.some((selected) => selected.key === item.key)
    );
    setDataSourceB(updatedDataSourceB);
    setSelectedProducts([]);
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
    <HelmetProvider>
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
        <Form name="basic">
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card className="col-1-item" size="large" title={`All Product`}>
                <Table
                  className="table"
                  rowSelection={{ type: "checkbox", ...rowSelection }}
                  columns={columnsA}
                  dataSource={dataSourceA}
                  scroll={{ x: 1000 }}
                  showSorterTooltip={{ target: "sorter-icon" }}
                />
              </Card>
            </div>
            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card className="col-2-item" size="large" title={`Product`}>
                <Table
                  className="table"
                  rowSelection={{ type: "checkbox", ...rowSelectionB }}
                  columns={columnsB}
                  dataSource={dataSourceB}
                  scroll={{ x: 310 }}
                  showSorterTooltip={{ target: "sorter-icon" }}
                />
              </Card>
            </div>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EventProduct;
