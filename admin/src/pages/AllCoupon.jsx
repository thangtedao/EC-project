import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";

// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  EditOutlined,
  AudioOutlined,
  PlusOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Table, Button, Input, Tag, Dropdown } from "antd";

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
  /* .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }

  .grid-center {
    display: grid;
    place-items: center;
  }
  .ed-btn {
    border: 1px solid #035ecf;
    border-radius: 3px;
    padding: 0 5px;
    color: #035ecf;
  }
  .md-font {
    font-size: 0.95rem;
  } */
`;

export const loader = async () => {
  try {
    const coupons = await customFetch
      .get(`/coupon`)
      .then(({ data }) => data.coupons);
    return coupons;
  } catch (error) {
    return error;
  }
};

const AllCoupon = () => {
  const coupons = useLoaderData();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState(null);

  const handleClickOpen = (coupon) => {
    setOpen(true);
    setCoupon(coupon);
  };

  const handleClose = () => {
    setOpen(false);
    setCoupon(null);
  };

  const deleteCoupon = async (id) => {
    await customFetch.delete(`/coupon/delete/${id}`);
    console.log("deleted");
    navigate("/all-coupon");
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
    },
  ];

  //Danh sách các cột
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      // render: (text) => <span className="md-font">{text}</span>,
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text) => <span className="md-font">{text}</span>,
    // },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      // render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Day start",
      dataIndex: "start",
      key: "start",

      // render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Used",
      dataIndex: "used",
      key: "used",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sold - b.sold,
      // render: (text) => <span className="md-font">{text}</span>,
    },
    // {
    //   title: "Expiry",
    //   dataIndex: "expiry",
    //   key: "expiry",
    //   render: (_, { expiry }) => (
    //     <span className="md-font">{expiry.split("T")[0]}</span>
    //   ),
    // },
    {
      title: "Action",
      key: "operation",
      width: 120,
      fixed: "right",
      render: () => (
        <Dropdown.Button
          menu={{
            items,
          }}
        >
          <EditOutlined />
          Edit
        </Dropdown.Button>
      ),
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a
      //       className="ed-btn grid-center"
      //       onClick={() => navigate(`/edit-coupon/${record.name}`)}
      //     >
      //       Edit
      //     </a>
      //   </Space>
      // ),
    },
  ];

  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const handleAddCouponClick = () => {
    navigate("/add-coupon"); // Navigate to the "/add-coupon" route
  };
  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Coupon</title>
        </Helmet>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: "Coupon",
            },
          ]}
        />
        <div className="title">Coupon</div>
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
            onClick={handleAddCouponClick}
          >
            Add Coupon
          </Button>
        </div>
        <Table
          className="table"
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          columns={columns}
          // dataSource={products.map((product) => ({
          //   ...product,
          //   key: product._id,
          // }))}
          // onChange={onChange}
          scroll={{ x: 1200 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllCoupon;
