import React from "react";
import Wrapper from "../assets/wrapper/login/Login.js";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../assets/LogoAdmin2.svg";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await customFetch
        .post("/auth/login", values)
        .catch(() => console.log("Login Failed"));
      const user = await customFetch
        .get("/user/current-user")
        .then(({ data }) => data.user)
        .catch(() => console.log("Login Failed"));
      if (user) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
        </Helmet>

        <div className="login-page">
          <div className="login-box">
            <div className="illustration-wrapper">
              <img
                // src="https://i.pinimg.com/736x/df/c6/21/dfc621af8a3bdadd85bc01b57fab975d.jpg"
                src={Logo}
                alt="Login"
              />
            </div>
            <Form
              size="large"
              name="login-form"
              initialValues={{
                email: "admin@gmail.com",
                password: "admin123",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p className="form-title">Welcome back</p>
              <p>Login to the Dashboard</p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  type="email"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};
export default Login;
