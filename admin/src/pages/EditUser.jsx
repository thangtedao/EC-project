import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/user/EditUser.js";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { UserOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Avatar,
  Form,
  Typography,
  Card,
  Breadcrumb,
  Space,
  Divider,
  Tag,
  Dropdown,
  Table,
} from "antd";

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return redirect("/all-user");
    }

    const user = await customFetch
      .get(`/user/admin/user-profile/${id}`)
      .then(({ data }) => data);

    const orders = await customFetch
      .get(`/order/?user=${user._id}`)
      .then(({ data }) => data);

    return { user, orders };
  } catch (error) {
    return error;
  }
};

const EditUser = () => {
  const { user, orders } = useLoaderData();
  const navigate = useNavigate();

  const userOrders = orders.filter((order) => order.user._id === user._id);
  user.totalSpent = userOrders.reduce(
    (total, order) => total + order.totalAmount,
    0
  );

  const handleEditOrder = (id) => {
    navigate(`/edit-order/${id}`);
  };

  const columns = [
    {
      title: "ID Order",
      width: 100,
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
      render: (_id) => "#" + _id.slice(18),
    },
    {
      title: "Items",
      width: 70,
      key: "items",
      render: (_, record) => record.orderItem.length,
    },
    {
      title: "TotalAmount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 150,
      render: (totalAmount) =>
        totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
    },
    {
      title: "Date",
      width: 120,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => createdAt.split("T")[0],
    },
    {
      title: "Time",
      width: 120,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => createdAt.split("T")[1].split(".")[0],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
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
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 120,
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

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit User</title>
        </Helmet>

        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
            },
            {
              title: <a onClick={() => navigate("/all-user")}>Customer</a>,
            },
            {
              title: "Customer Detail",
            },
          ]}
        />

        <div className="title">Customer Detail</div>

        <Form
          name="basic"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={user?.fullName || "Customer"}
                extra={"ID: " + user?._id || "ID: 123"}
              >
                <Space wrap size={16}>
                  <Avatar size={64} icon={<UserOutlined />} />
                  <Typography.Text>{user?.fullName}</Typography.Text>
                </Space>

                <Divider />
                <Space wrap size={16}>
                  <Typography.Text strong>ID:</Typography.Text>
                  <Typography.Text size="large">{user?._id}</Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Email: </Typography.Text>
                  <Typography.Text size="large">{user?.email}</Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Address: </Typography.Text>
                  <Typography.Text>{user?.address}</Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Last Activity </Typography.Text>
                  <Typography.Text size="large">
                    {"Bố thằng nào biết được =)))"}
                  </Typography.Text>
                </Space>

                <Divider />
                <Space wrap size={16}>
                  <Typography.Text strong>Last Order </Typography.Text>
                  <Typography.Text size="large">6 days ago</Typography.Text>
                </Space>

                <Divider />
                <Space wrap size={16}>
                  <Typography.Text strong>Status: </Typography.Text>
                  {user?.isBlocked ? (
                    <Tag color="red" size="large">
                      Disabled
                    </Tag>
                  ) : (
                    <Tag color="green" size="large">
                      Active
                    </Tag>
                  )}
                </Space>
              </Card>

              <Card className="col-1-item" size="large" title={`Change Status`}>
                <Form.Item name="isBlocked">
                  <Select
                    size="large"
                    allowClear
                    placeholder="Select Status"
                    options={[
                      {
                        value: "OK",
                        label: "OK",
                      },
                    ]}
                  />
                </Form.Item>
              </Card>
            </div>
            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {/* Order Table */}
              <Card
                className="col-2-item"
                size="large"
                title={`Orders`}
                extra={`Total spent ${user.totalSpent
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}vnđ on ${
                  orders.length
                } orders`}
              >
                <Table
                  className="col-2-item"
                  columns={columns}
                  dataSource={orders.map((order) => ({
                    ...order,
                    key: order._id,
                  }))}
                  scroll={{ x: 980 }}
                  showSorterTooltip={{
                    target: "sorter-icon",
                  }}
                />
              </Card>
            </div>
          </div>
          <div className="btn">
            <Button danger size="large">
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
export default EditUser;
