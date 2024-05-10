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
  const { monthlyProducts } = useDashboardContext();
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

  // products.forEach((product) => {
  //   product.sold = orders.reduce((total, order) => {
  //     return (
  //       total +
  //       order.orderItem.filter((item) => product._id === item.product.id).length
  //     );
  //   }, 0);
  // });

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

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
      dataIndex: "image",
      width: 75,
      key: "image",
      fixed: "left",
      render: (image) => <Image width={50} height={50} src={image} />,
    },
    {
      title: "Name",
      width: 170,
      dataIndex: "name",
      key: "name",
      // fixed: "left",
      render: (text, record) => (
        <a onClick={() => navigate(`/detail-product/${record._id}`)}>{text}</a>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      // render: (category) => {
      //   return category?.map((item) => <div key={item._id}>{item?.name}</div>);
      // },
      // filters: categories?.map((category) => {
      //   return {
      //     text: category?.name,
      //     value: category?._id,
      //     children: category?.children.map((item) => {
      //       return { text: item?.name, value: item?._id };
      //     }),
      //   };
      // }),
      // filterMode: "tree",
      // onFilter: (value, record) =>
      //   record?.category?.some((cat) => cat?._id === value),
    },
    {
      title: "View",
      dataIndex: "totalSold",
      key: "totalSold",
      width: 70,
      sorter: (a, b) => a.totalSold - b.totalSold,
    },
    {
      title: "Sold",
      dataIndex: "totalSold",
      key: "totalSold",
      width: 70,
      sorter: (a, b) => a.totalSold - b.totalSold,
    },
    {
      title: "Revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      width: 110,
      render: (revenue) =>
        revenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.totalRevenue - b.totalRevenue,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 160,
      render: ({ _id }) => (
        <Dropdown.Button
          onClick={() => handleEditOrder(_id)}
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
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          pagination={paginationConfig}
          columns={columns}
          dataSource={monthlyProducts?.map((product) => ({
            ...product,
            key: product._id,
          }))}
          onChange={onChange}
          scroll={{ x: 415 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default DashboardProduct;
