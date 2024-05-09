import React, { useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/order/AllOrder.js";
import { useNavigate, useLoaderData } from "react-router-dom";
import { ORDER_STATUS } from "../utils/constants.js";
import {
  EditOutlined,
  AudioOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Table, Button, Input, Dropdown, Tag, Space } from "antd";
import Highlighter from "react-highlight-words";

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const orders = await customFetch
      .get(`/order/?admin=true`)
      .then(({ data }) => data);

    return { orders };
  } catch (error) {
    return error;
  }
};

const AllOrder = () => {
  const { orders } = useLoaderData();
  const navigate = useNavigate();

  const handleEditOrder = (id) => {
    navigate(`/edit-order/${id}`);
  };
  const handleViewOrder = (id) => {
    navigate(`/edit-order/${id}`);
  };
  //Dropdown
  const items = [
    {
      label: "Edit",
      key: "1",
      icon: <EditOutlined />,
      onClick: (_id) => handleEditOrder(_id),
    },
  ];

  // Search
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      dataIndex === "user"
        ? record[dataIndex].fullName
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  //Danh sách các cột
  const columns = [
    {
      title: "ID Order",
      width: 120,
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
      render: (_id) => "#" + _id.slice(18),
    },
    {
      title: "Customer",
      width: 200,
      dataIndex: "user",
      key: "user",
      fixed: "left",
      ...getColumnSearchProps("user"),
      render: (user) => (
        <a onClick={() => navigate(`/edit-user/${user._id}`)}>
          {user.fullName}
        </a>
      ),
    },
    {
      title: "TotalAmount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 150,
      render: (totalAmount) =>
        totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      ...getColumnSearchProps("createdAt"),
      render: (createdAt) => createdAt.split("T")[0],
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (createdAt) => createdAt.split("T")[1].split(".")[0],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
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
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
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
      title: "Request",
      dataIndex: "isCancel",
      key: "isCancel",
      width: 100,
      render: (isCancel) => isCancel && <Tag color="red">Cancel Request</Tag>,
      filters: [
        {
          text: "Cancel Request",
          value: true,
        },
      ],
      onFilter: (value, record) => record?.isCancel === value,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: ({ _id }) => (
        <Dropdown.Button
          onClick={() => handleEditOrder(_id)}
          menu={{
            items: items.map((item) => ({
              ...item,
              onClick: () => item.onClick(_id),
            })),
          }}
        >
          <EyeOutlined />
          View
        </Dropdown.Button>
      ),
    },
  ];

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  // Số lượng sản phẩm trên mỗi trang
  const paginationConfig = {
    pageSize: 10,
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
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
            },
            {
              title: "Order",
            },
          ]}
        />

        <div className="title">Order</div>

        <Table
          className="table"
          pagination={paginationConfig}
          columns={columns}
          dataSource={orders.map((order) => ({
            ...order,
            key: order._id,
          }))}
          onChange={onChange}
          scroll={{ x: 1200 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllOrder;
