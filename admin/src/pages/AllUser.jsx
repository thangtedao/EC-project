import React, { useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/user/AllUser.js";
import { useNavigate, useLoaderData } from "react-router-dom";
import {
  EditOutlined,
  AudioOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Table,
  Image,
  Button,
  Input,
  Dropdown,
  Space,
  Tag,
} from "antd";
import Highlighter from "react-highlight-words";

export const loader = async () => {
  try {
    const orders = await customFetch
      .get(`/order/?status=Delivered&&admin=true`)
      .then(({ data }) => data);

    const users = await customFetch
      .get("/user/admin/all-users")
      .then(({ data }) => data);

    return { users, orders };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const AllUser = () => {
  const { users, orders } = useLoaderData();
  const navigate = useNavigate();

  users.forEach((user) => {
    const userOrders = orders.filter((order) => order.user._id === user._id);
    user.numOfOrder = userOrders.length;
    user.totalSpent = userOrders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );
  });

  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const handleEditUser = (id) => {
    navigate(`/edit-user/${id}`);
  };
  const handleViewUser = (id) => {
    navigate(`/edit-user/${id}`);
  };
  //Dropdown
  const items = [
    {
      label: "Edit",
      key: "1",
      icon: <EditOutlined />,
      onClick: (_id) => handleEditUser(_id),
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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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

  const columns = [
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      width: 90,
      fixed: "left",
      render: (avatar) => (
        <>
          {avatar ? (
            <Image width={45} height={45} src={avatar} />
          ) : (
            <Image
              width={45}
              height={45}
              src={
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
            />
          )}
        </>
      ),
    },
    {
      title: "Name",
      width: 150,
      fixed: "left",
      dataIndex: "fullName",
      key: "fullName",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Email",
      width: 150,
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      width: 150,
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      width: 250,
      dataIndex: "address",
      key: "address",
      render: (address) => {
        if (address.city && address.district && address.ward && address.home)
          return (
            address.city +
            ", " +
            address.district +
            ", " +
            address.ward +
            ", " +
            address.home
          );
      },
    },
    {
      title: "Order",
      width: 80,
      dataIndex: "numOfOrder",
      key: "order",
      sorter: (a, b) => a.numOfOrder - b.numOfOrder,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total spent",
      width: 150,
      dataIndex: "totalSpent",
      key: "spent",
      render: (totalSpent) =>
        totalSpent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
      sorter: (a, b) => a.totalSpent - b.totalSpent,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rank",
      width: 110,
      dataIndex: "rank",
      key: "rank",
      render: (rank) => {
        switch (rank) {
          case "silver":
            return <Tag color="silver">{rank?.toUpperCase()}</Tag>;
          case "gold":
            return <Tag color="gold">{rank?.toUpperCase()}</Tag>;
          case "diamond":
            return <Tag color="cyan">{rank?.toUpperCase()}</Tag>;
          default:
            return <Tag color="lime">{rank?.toUpperCase()}</Tag>;
        }
      },
      filters: [
        {
          text: "Member",
          value: "member",
        },
        {
          text: "Silver",
          value: "silver",
        },
        {
          text: "Gold",
          value: "gold",
        },
        {
          text: "Diamond",
          value: "diamond",
        },
      ],
      onFilter: (value, record) => record?.rank === value,
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      width: 100,
      render: (isBlocked) => (isBlocked ? "Disabled" : "Active"),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: ({ _id }) => (
        <Dropdown.Button
          onClick={() => handleViewUser(_id)}
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

  // Số lượng sản phẩm trên mỗi trang
  const paginationConfig = {
    pageSize: 10,
  };

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
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
            },
            {
              title: "Customer",
            },
          ]}
        />

        <div className="title">User</div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            marginBottom: 20,
          }}
        ></div>

        <Table
          className="table"
          pagination={paginationConfig}
          columns={columns}
          dataSource={users?.map((user) => ({
            ...user,
            key: user._id,
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

export default AllUser;
