import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import {
  redirect,
  useNavigation,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { UserOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import {
  Modal,
  Upload,
  Button,
  Select,
  Avatar,
  Form,
  Input,
  Typography,
  InputNumber,
  Card,
  Breadcrumb,
  Space,
  Divider,
  Tag,
  Dropdown,
  Table,
} from "antd";

const Wrapper = styled.div`
  width: 100%;

  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
  }
  .col-1 {
    width: 35%;
    height: fit-content;
  }
  .col-2 {
    width: 65%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .btn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    background-color: #f3f3f3;
    padding: 1 rem;
    height: 60px;
    width: 350px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-typography {
    size: "large";
  }
  .ant-table {
    border: 1px solid lightgray;
    border-radius: 2px;
  }
`;

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return redirect("/all-user");
    }

    const user = await customFetch
      .get(`/user/admin/user-profile/${id}`)
      .then(({ data }) => data);

    // const orders = await customFetch
    //   .get(`/order/?userId=${user._id}`)
    //   .then(({ data }) => data.orders);

    return { user };
  } catch (error) {
    return error;
  }
};

const EditUser = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const handleEditOrder = () => {
    navigate("/edit-order/:id");
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "orderId",
      key: "orderId",
      width: 120,
      fixed: "left",
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
      title: "Items",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_, { orderStatus }) => (
        <>
          {orderStatus.map((tag) => {
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
    },
    {
      title: "Action",
      key: "action",
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
      key: 1,
      orderId: "1",
      orderStatus: ["Pending", "Processing"],
    },
    {
      key: 2,

      orderId: "2",
      orderStatus: ["Cancelled"],
    },
    {
      key: 3,

      orderId: "3",
      orderStatus: ["Shipped", "Delivered"],
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
              title: <a href="/">Dashboard</a>,
            },
            {
              title: <a href="/all-user">Customer</a>,
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
                title={`Customer`}
                extra={"ID: 123"}
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
                <Typography.Title className="input-title">
                  Change Status
                </Typography.Title>
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
                extra={`Total spent 1 tỷ on 100 orders`}
              >
                <Table
                  className="col-2-item"
                  columns={columns}
                  // dataSource={categories.map((category) => ({
                  //   ...category,
                  //   key: category._id,
                  // }))}
                  dataSource={data}
                  scroll={{ x: 1200 }}
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
