import React, { useRef, useState } from "react";
import Wrapper from "../assets/wrapper/promotion/AddEvent.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import { useLoaderData, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  EditOutlined,
  PlusOutlined,
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
    const promotions = await customFetch
      .get(`/promotion/?admin=true`)
      .then(({ data }) => data);
    return { promotions };
  } catch (error) {
    return error;
  }
};

const AllEvent = () => {
  const navigate = useNavigate();
  const { promotions } = useLoaderData();
  console.log(promotions);

  dayjs.extend(customParseFormat);
  const dateFormat = "HH:mm:ss DD-MM-YYYY";

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

  //Dropdown
  const items = [
    {
      label: "Edit",
      key: "1",
      icon: <EditOutlined />,
      onClick: (_id) => handleEditEvent(_id),
    },
  ];

  const handleAddEvent = () => {
    navigate("/add-event");
  };

  const handleEditEvent = (id) => {
    navigate(`/edit-event/${id}`);
  };

  const handleViewEvent = (id) => {
    console.log("view");
  };

  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  //Danh sách các cột
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      ...getColumnSearchProps("description"),
    },
    {
      title: "Discount",
      dataIndex: "discountValue",
      key: "discountValue",
      width: 100,
      render: (discountValue, record) =>
        record.discountType === "percentage" ? (
          <p>{discountValue + "%"}</p>
        ) : (
          <p>
            {discountValue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
              "₫"}
          </p>
        ),
      filters: [
        {
          text: "Percentage (%)",
          value: "percentage",
        },
        { text: "Fixed (vnđ)", value: "fixed" },
      ],
      onFilter: (value, record) => record?.discountType === value,
    },
    {
      title: "Start",
      dataIndex: "startDate",
      key: "startDate",
      width: 200,
      render: (startDate) => (
        <span className="md-font">
          {dayjs(new Date(startDate).toString()).format(dateFormat)}
        </span>
      ),
    },
    {
      title: "End",
      dataIndex: "endDate",
      key: "endDate",
      width: 200,
      render: (endDate) => (
        <span className="md-font">
          {dayjs(new Date(endDate).toString()).format(dateFormat)}
        </span>
      ),
    },
    {
      title: "Item",
      dataIndex: "products",
      key: "products",
      width: 80,
      render: (products) => products?.length,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.products?.length - b.products?.length,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive) =>
        isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">InActive</Tag>
        ),
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "InActive",
          value: false,
        },
      ],
      onFilter: (value, record) => record?.isActive === value,
    },
    {
      title: "Action",
      key: "operation",
      width: 150,
      fixed: "right",
      render: ({ _id }) => (
        <Dropdown.Button
          onClick={() => handleViewEvent(_id)}
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
          <title>All Event</title>
        </Helmet>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },

            {
              title: "Event",
            },
          ]}
        />

        <div className="title">Event</div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ width: 150 }}
            onClick={handleAddEvent}
          >
            Add Event
          </Button>
        </div>

        <Table
          className="table"
          pagination={paginationConfig}
          columns={columns}
          dataSource={promotions.map((promotion) => ({
            ...promotion,
            key: promotion._id,
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

export default AllEvent;
