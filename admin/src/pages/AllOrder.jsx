import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData, Form } from "react-router-dom";
// import { Space, Table } from "antd";
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
//     font-size: 2rem;
//     font-weight: bold;
//     color: #00193b;
//     margin-bottom: 1rem;
//   }

//   .ed-btn {
//     color: #035ecf;
//     :hover {
//       color: #a80000;
//     }
//   }

//   .filter-bar {
//     width: 80%;
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     padding: 1rem;
//   }
//   .form-filter {
//     width: fit-content;
//     display: flex;
//     gap: 0.3rem;

//     .form-filter-label {
//       display: grid;
//       place-items: center;
//       height: 30px;
//       font-size: 0.9rem;
//       font-weight: bold;
//       color: #00193b;
//     }
//     .form-filter-select {
//       height: 30px;
//       border: 1px solid #e2e1e1;
//       border-radius: 8px;
//     }
//   }
//   .btn {
//     width: 75px;
//     height: 28px;
//     border-radius: 5px;
//     background-color: #035ecf;
//     color: white;
//     font-weight: bolder;
//   }

//   .grid-center {
//     display: grid;
//     place-items: center;
//   }
//   .ed-btn {
//     border: 1px solid #035ecf;
//     border-radius: 3px;
//     padding: 0 5px;
//     color: #035ecf;
//   }
//   .md-font {
//     font-size: 0.95rem;
//   }
// `;

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

export const loader = async ({ request }) => {
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

const AllOrder = () => {
  const { orders, params } = useLoaderData();
  const navigate = useNavigate();

  console.log(orders);

  // const columns = [
  //   {
  //     title: "Customer",
  //     dataIndex: "orderBy",
  //     key: "orderBy",
  //     width: 250,
  //     render: (_, { orderBy }) => (
  //       <span className="md-font">{orderBy.fullName}</span>
  //     ),
  //   },
  //   {
  //     title: "Date",
  //     dataIndex: "createdAt",
  //     key: "createdAt",
  //     render: (_, { createdAt }) => (
  //       <span className="md-font">{createdAt.split("T")[0]}</span>
  //     ),
  //   },
  //   {
  //     title: "Time",
  //     dataIndex: "createdAt",
  //     key: "createdAt",
  //     render: (_, { createdAt }) => (
  //       <span className="md-font">{createdAt.split("T")[1].split(".")[0]}</span>
  //     ),
  //   },
  //   {
  //     title: "Items",
  //     dataIndex: "products",
  //     key: "products",
  //     render: (_, { products }) => (
  //       <span className="md-font">{products.length}</span>
  //     ),
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "orderStatus",
  //     key: "orderStatus",
  //     render: (text) => <span className="md-font">{text}</span>,
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <a
  //           className="ed-btn grid-center"
  //           onClick={() => navigate(`/edit-order/${record._id}`)}
  //         >
  //           View
  //         </a>
  //       </Space>
  //     ),
  //   },
  // ];
  const handleEditOrder = () => {
    navigate("/edit-order/:id");
  };
  //Danh sách các cột
  const columns = [
    {
      title: "ID Order",
      width: 120,
      dataIndex: "id",
      key: "id",
      fixed: "left",
      // render: (images) => <Image width={100} height={100} src={images[0]} />,
    },
    {
      title: "Image",
      width: 120,
      dataIndex: "images",
      key: "images",
      fixed: "left",
      // render: (images) => <Image width={100} height={100} src={images[0]} />,
    },
    {
      title: "Customer",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = "";

            if (tag === "Cancelled") {
              color = "red";
            } else if (tag === "Delivered") {
              color = "green";
            } else if (tag === "Processing") {
              color = "orange";
            } else if (tag === "Pending") {
              color = "gold";
            } else if (tag === "Shipped") {
              color = "blue";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      // filters: Object.keys(PRODUCT_STATUS).map((key) => {
      //   return {
      //     text: PRODUCT_STATUS[key],
      //     value: PRODUCT_STATUS[key],
      //   };
      // }),
      // onFilter: (value, record) => record?.status === value,
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
      render: () => (
        <Dropdown.Button
          onClick={handleEditOrder}
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
  const data = [
    {
      key: "1",
      name: "John Brown",

      status: ["Pending", "Processing"],
    },
    {
      key: "2",
      name: "Jim Green",

      status: ["Cancelled"],
    },
    {
      key: "3",
      name: "Joe Black",
      status: ["Shipped", "Delivered"],
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
  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Order</title>
        </Helmet>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: "Order",
            },
          ]}
        />
        <div className="title">Order</div>
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

        <Table
          className="table"
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          pagination={paginationConfig}
          columns={columns}
          dataSource={data}
          // dataSource={products.map((product) => ({
          //   ...product,
          //   key: product._id,
          // }))}
          onChange={onChange}
          scroll={{ x: 1200 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
        {/* 
        <Form className="filter-bar">
          <div className="form-filter">
            <label htmlFor="category" className="form-filter-label">
              Date
            </label>
            <select
              name="date"
              className="form-filter-select"
              defaultValue={params.date || "new"}
            >
              <option value="new">Mới nhất</option>
              <option value="old">Cũ nhất</option>
            </select>
          </div>

          <div className="form-filter">
            <label htmlFor="status" className="form-filter-label">
              Status
            </label>
            <select
              name="status"
              className="form-filter-select"
              defaultValue={params.status || "all"}
            >
              <option value="all">Tất cả</option>
              <option value="Chờ Xác Nhận">Chờ Xác Nhận</option>
              <option value="Đang Xử Lý">Đang Xử Lý</option>
              <option value="Đang Giao Hàng">Đang Giao Hàng</option>
              <option value="Đã Giao Hàng">Đã Giao Hàng</option>
              <option value="Đã Hủy">Đã Hủy</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Apply
          </button>
        </Form>

        <div style={{ width: "80%" }}>
          <Table columns={columns} dataSource={orders} size="middle" />
        </div> */}
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllOrder;
