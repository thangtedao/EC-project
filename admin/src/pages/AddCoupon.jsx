import React, { useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/coupon/AddCoupon.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Modal,
  Button,
  Form,
  Select,
  Input,
  Typography,
  Card,
  Breadcrumb,
  DatePicker,
  InputNumber,
  Table,
  Image,
  Dropdown,
  Space,
} from "antd";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  EditOutlined,
  AudioOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/coupon", data);
    return redirect("/all-coupon");
  } catch (error) {
    return error;
  }
};

export const loader = async () => {
  try {
    const orders = await customFetch
      .get(`/order/?admin=true`)
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

const AddCoupon = () => {
  const navigate = useNavigate();
  const { users, orders } = useLoaderData();

  users.forEach((user) => {
    const userOrders = orders.filter((order) => order.user._id === user._id);
    user.numOfOrder = userOrders.length;
    user.totalSpent = userOrders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );
  });

  const [discountType, setDiscountType] = useState("percentage");

  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY-MM-DD HH:mm:ss";

  const { RangePicker } = DatePicker;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateRangeChange = (dates) => {
    if (dates) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const handleViewUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

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
      // fixed: "left",
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
      render: (rank) => rank?.toUpperCase(),
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
      width: 100,
      render: ({ _id }) => (
        <div style={{ cursor: "pointer" }} onClick={() => handleViewUser(_id)}>
          <EyeOutlined style={{ marginRight: 5 }} />
          View
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedUserIds,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedUserIds(selectedRowKeys);
    },
  };

  // Số lượng sản phẩm trên mỗi trang
  const paginationConfig = {
    pageSize: 10,
  };

  //Modal
  const [open, setModalOpen] = useState(false);
  //Mở Modal (Confirm box)
  const showModal = () => {
    setModalOpen(true);
  };
  //Đóng Modal sau khi xác nhận
  const handleOk = () => {
    setModalOpen(false);
  };
  //Đóng Modal sau khi xác nhận
  //Đóng ReviewOpen sau khi xác nhận
  const handleCancel = () => {
    setModalOpen(false);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onFinish = async (values) => {
    try {
      values.startDate = startDate.format(dateFormat);
      values.endDate = endDate.format(dateFormat);
      values.users = selectedUserIds;
      const response = await customFetch.post("/coupon/create", values);
      if (response) navigate("/all-coupon");
    } catch (error) {
      return;
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
            },
            {
              title: <a onClick={() => navigate("/all-coupon")}>Coupon</a>,
            },
            {
              title: "Add Coupon",
            },
          ]}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Coupon</title>
        </Helmet>
        <div className="title">Add Coupon</div>

        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={`Coupon information`}
              >
                <div>
                  {/* INFORMATION FIELDS */}
                  <div>
                    <Typography.Title className="input-title">
                      Name
                    </Typography.Title>
                    <Form.Item name="name">
                      <Input
                        required
                        size="large"
                        placeholder="Enter Coupon Name"
                      />
                    </Form.Item>

                    <div className="customer">
                      <div className="customer-item-1">
                        <Typography.Title className="input-title">
                          Customer
                        </Typography.Title>
                        <Form.Item
                          name="targetCustomers"
                          rules={[
                            {
                              required: true,
                              message: "Please select target customer",
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            placeholder="Target Customer"
                            options={[
                              {
                                value: "member",
                                label: "Member",
                              },
                              {
                                value: "silver",
                                label: "Silver",
                              },
                              {
                                value: "gold",
                                label: "Gold",
                              },
                              {
                                value: "diamond",
                                label: "Diamond",
                              },
                            ]}
                          />
                        </Form.Item>
                      </div>

                      <div className="customer-item-2">
                        <Typography.Title className="input-title">
                          Number of usage
                        </Typography.Title>
                        <Form.Item name="numberOfUses">
                          <InputNumber
                            required
                            style={{ width: "100%" }}
                            size="large"
                            placeholder="Enter Number"
                          />
                        </Form.Item>
                      </div>

                      {discountType === "percentage" && (
                        <div className="customer-item-3">
                          <Typography.Title className="input-title">
                            Maximum Discount
                          </Typography.Title>
                          <Form.Item name="maxDiscount">
                            <InputNumber
                              style={{ width: "100%" }}
                              size="large"
                              placeholder="Enter Number"
                            />
                          </Form.Item>
                        </div>
                      )}
                    </div>

                    <div className="discount">
                      <div className="discount-item-1">
                        <Typography.Title className="input-title">
                          Code
                        </Typography.Title>
                        <Form.Item name="code">
                          <Input
                            required
                            size="large"
                            placeholder="Enter Coupon Code"
                          />
                        </Form.Item>
                      </div>

                      <div className="discount-item-2">
                        <Typography.Title className="input-title">
                          Type
                        </Typography.Title>
                        <Form.Item
                          name="discountType"
                          rules={[
                            {
                              required: true,
                              message: "Please select disount type",
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            placeholder="Discount Type"
                            value={discountType}
                            onChange={(value) => setDiscountType(value)}
                            options={[
                              {
                                value: "percentage",
                                label: "Percentage",
                              },
                              {
                                value: "fixed",
                                label: "Fixed",
                              },
                            ]}
                          />
                        </Form.Item>
                      </div>

                      <div className="discount-item-3">
                        <Typography.Title className="input-title">
                          Discount
                        </Typography.Title>
                        <Form.Item name="discountValue">
                          <InputNumber
                            required
                            suffix={discountType === "percentage" ? "%" : "VND"}
                            style={{ width: "100%" }}
                            size="large"
                            placeholder="eg. 10"
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <Typography.Title className="input-title">
                      Description
                    </Typography.Title>
                    <Form.Item name="description">
                      <Input.TextArea
                        size="large"
                        placeholder="Type your description..."
                        autoSize={{
                          minRows: 7,
                          maxRows: 9,
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Card>
            </div>

            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card className="col-2-item" size="large" title={`Day`}>
                <Typography.Title className="input-title">
                  Date
                </Typography.Title>
                <RangePicker
                  required
                  showTime
                  value={[startDate, endDate]}
                  size="large"
                  style={{ width: "100%" }}
                  onChange={handleDateRangeChange}
                />
              </Card>

              <Table
                className="table col-2-item"
                pagination={paginationConfig}
                columns={columns}
                rowSelection={{ type: "checkbox", ...rowSelection }}
                dataSource={users?.map((user) => ({
                  ...user,
                  key: user._id,
                }))}
                scroll={{ x: 1200 }}
                showSorterTooltip={{
                  target: "sorter-icon",
                }}
              />
            </div>
          </div>

          {/* BUTTON SUBMIT */}
          <div className="btn">
            <Button
              danger
              size="large"
              onClick={() => {
                Modal.confirm({
                  title: "Confirm",
                  content: "Do you want to cancel?",
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                });
              }}
            >
              Cancel
            </Button>

            <Button size="large" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AddCoupon;
