import React from "react";
import styled from "styled-components";
import { useNavigate, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../state/userSlice.js";
import { Button, Checkbox, Form, Input } from "antd";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 220px);
  display: flex;
  justify-content: center;
  align-items: center;

  .form-login {
    width: 30vw;
    background-color: var(--background-color);
    border: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  h4 {
    font-weight: 700;
    margin-bottom: 2rem;
  }
  .form-row {
    width: 100%;
  }
  .form-label {
    font-size: 1rem;
    font-weight: 400;
  }
  .form-input {
    font-size: medium;
    height: 2.5rem;
    border: transparent;
    border-bottom: 1px solid lightgray;
    background-color: var(--background-color);
  }
  .btn-block {
    height: 2.5rem;
    border: transparent;
    background-color: #e0052b;
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: 700;
    color: white;
    border-radius: 5px;
  }
  p {
    color: #3d3d3d;
  }
  .member-btn {
    margin-left: 0.5rem;
    color: #e0052b;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const onFinish = async (values) => {
    await customFetch.post("/auth/login", values);
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);
    if (user) {
      dispatch(login({ user: { fullName: user.fullName, role: user.role } }));
      navigate("/");
    } else {
      console.log("Login Fail");
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

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            // name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Login;
