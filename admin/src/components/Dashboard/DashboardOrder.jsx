import React from "react";
import { HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { EditOutlined, FormOutlined } from "@ant-design/icons";
import { Tag, Table, Dropdown } from "antd";
import { useDashboardContext } from "../../pages/Dashboard";
import { ORDER_STATUS } from "../../utils/constants";

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

const DashboardOrder = () => {
  const { monthlyOrders } = useDashboardContext();
  const navigate = useNavigate();

  let orders = [];
  monthlyOrders.forEach((item) => {
    item.orders.forEach((order) => orders.push(order));
  });

  const handleEditOrder = (id) => {
    navigate(`/edit-order/${id}`);
  };

  const columns = [
    {
      title: "ID Order",
      width: 90,
      dataIndex: "_id",
      key: "_id",
      // fixed: "left",
      render: (_id) => "#" + _id?.slice(18),
    },
    {
      title: "Customer",
      width: 150,
      dataIndex: "user",
      key: "user",
      fixed: "left",
      render: (user) => user.fullName,
    },
    {
      title: "Date",
      width: 110,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => createdAt?.split("T")[0],
    },
    {
      title: "Time",
      width: 110,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => createdAt?.split("T")[1].split(".")[0],
    },
    {
      title: "Total",
      width: 120,
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) =>
        totalAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      width: 110,
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        if (status === "Cancelled") {
          color = "red";
        } else if (status === "Delivered") {
          color = "green";
        } else if (status === "Processing") {
          color = "orange";
        } else if (status === "Pending") {
          color = "gold";
        } else if (status === "Delivering") {
          color = "blue";
        }
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
      filters: Object.keys(ORDER_STATUS).map((key) => {
        return {
          text: ORDER_STATUS[key],
          value: ORDER_STATUS[key],
        };
      }),
      onFilter: (value, record) => record?.status === value,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
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

  //Dropdown
  const items = [
    {
      label: "View",
      key: "1",
      icon: <FormOutlined />,
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

  return (
    <HelmetProvider>
      <Wrapper>
        <Table
          className="table"
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          pagination={paginationConfig}
          columns={columns}
          dataSource={orders.map((order) => ({
            ...order,
            key: order._id,
          }))}
          onChange={onChange}
          scroll={{ x: 830 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default DashboardOrder;
