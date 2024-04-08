import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";
import img from "../assets/react.svg";

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
import { Breadcrumb, Tag, Table, Image, Button, Input, Dropdown } from "antd";

// const Wrapper = styled.div`

//   width: 100%;
//   padding: 1rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   .title {
//     font-size: 1.8rem;
//     font-weight: bold;
//     color: #00193b;
//     margin-bottom: 1.5rem;
//   }

//   .grid-center {
//     display: grid;
//     place-items: center;
//   }
//   .btn {
//     width: 75px;
//     height: 28px;
//     border-radius: 5px;
//     background-color: #035ecf;
//     color: white;
//     font-weight: bolder;
//   }
//   .ed-btn {
//     border: 1px solid #035ecf;
//     border-radius: 3px;
//     padding: 0 5px;
//     color: #035ecf;
//   }
//   .dl-btn {
//     border: 1px solid #ff5470;
//     border-radius: 3px;
//     padding: 0 5px;
//     color: #ff5470;
//   }
//   .md-font {
//     font-size: 0.95rem;
//   }
// `;
//lấy của order
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
export const loader = async () => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const orders = await customFetch
      .get(`/order/`, { params })
      .then(({ data }) => data.orders);

    return { orders, params };
  } catch (error) {
    return error;
  }
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
const AllUser = () => {
  const users = useLoaderData();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // const handleClickOpen = (user) => {
  //   setOpen(true);
  //   setUser(user);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setUser(null);
  // };

  // const blockUser = async (id) => {
  //   await customFetch.patch(`/user/block-user/${id}`);
  //   console.log("blocked");
  //   navigate("/all-user");
  // };

  // const unBlockUser = async (id) => {
  //   await customFetch.patch(`/user/unblock-user/${id}`);
  //   console.log("unblocked");
  //   navigate("/all-user");
  // };
  const handleEditUser = () => {
    navigate("/edit-user/:id");
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      width: 120,
      fixed: "left",
      // render: (_, { avatar }) => (
      //   <>
      //     {avatar ? (
      //       <Image width={45} src={avatar} />
      //     ) : (
      //       <Image width={45} src={img} />
      //     )}
      //   </>
      // ),
    },
    {
      title: "Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      // dataIndex: "fullName",
      // key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Total spent",
      dataIndex: "spent",
      key: "spent",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Last Activity",
      dataIndex: "activity",
      key: "activity",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: () => (
        <Dropdown.Button
          onClick={handleEditUser}
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
      //       // onClick={() => navigate(`/edit-user/${record._id}`)}
      //     >
      //       View
      //     </a>
      //     {record.isBlocked ? (
      //       <a
      //         className="dl-btn grid-center"
      //         // onClick={() => handleClickOpen(record)}
      //       >
      //         UnBlock
      //       </a>
      //     ) : (
      //       <a
      //         className="dl-btn grid-center"
      //         // onClick={() => handleClickOpen(record)}
      //       >
      //         Block
      //       </a>
      //     )}
      //   </Space>
      // ),
    },
  ];
  const data = [
    {
      key: "1",
      email: "cc@gmail.cc",
      name: "John Brown",
      order: "5",
      status: ["Disabled"],
      activity: "08/04/24",
      spent: "1 tỷ",
    },
    {
      key: "2",
      name: "Jim Green",
      order: "9",
      status: "Active",
    },
    {
      key: "3",
      name: "Joe Black",
    },
  ];
  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>User</title>
        </Helmet>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: "User",
            },
          ]}
        />
        <div className="title">User</div>
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

          {/* <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ width: 150 }}
            // onClick={handleAddCategoryClick}
          >
            Add Category
          </Button> */}
        </div>

        <Table
          className="table"
          columns={columns}
          // dataSource={categories.map((category) => ({
          //   ...category,
          //   key: category._id,
          // }))}
          dataSource={data}
          onChange={onChange}
          scroll={{ x: 1200 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
        {/* <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {user && user.isBlocked ? "Ublock User?" : "Block User?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          {user && user.isBlocked ? (
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => unBlockUser(user._id)} autoFocus>
                UnBlock
              </Button>
            </DialogActions>
          ) : (
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => blockUser(user._id)} autoFocus>
                Block
              </Button>
            </DialogActions>
          )}
        </Dialog> */}
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllUser;
