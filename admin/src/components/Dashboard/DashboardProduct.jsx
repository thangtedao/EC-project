import React, { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PRODUCT_STATUS } from "../../utils/constants.js";

import { EditOutlined, FormOutlined } from "@ant-design/icons";
import { Table, Image, Dropdown, Tag } from "antd";
import { useDashboardContext } from "../../pages/Dashboard.jsx";

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

const DashboardProduct = () => {
  const { products, orders, startDate, endDate } = useDashboardContext();
  const navigate = useNavigate();

  // products.map((product) => {
  //   let sold = 0;
  //   orders.map((order) => {
  //     order.orderItem.map((item) => {
  //       if (product._id === item.product.id) sold++;
  //     });
  //   });
  //   product.sold = sold;
  // });

  products.forEach((product) => {
    product.sold = orders.reduce((total, order) => {
      return (
        total +
        order.orderItem.filter((item) => product._id === item.product.id).length
      );
    }, 0);
  });

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

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
      dataIndex: "images",
      width: 80,
      key: "images",
      fixed: "left",
      render: (images) => <Image width={50} height={50} src={images[0]} />,
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
      width: 70,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
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
      title: "Action",
      key: "operation",
      // fixed: "right",
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
          scroll={{ x: 610 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default DashboardProduct;
