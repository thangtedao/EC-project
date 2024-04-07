import React from "react";
import styled from "styled-components";
import { useNavigate, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../state/userSlice.js";
import { Button, Checkbox, Form, Input } from "antd";

const Wrapper = styled.div`
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #d9edff;
  }

  .login-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    max-width: 1000px;
    background-color: white;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.16);
    overflow: hidden;
    margin: 0 auto;
    border-radius: 12px;
  }

  .login-box form {
    flex: 1 0 100%;
    max-width: 480px;
    width: 100%;
    padding: 60px;
  }

  .login-box form p {
    margin-bottom: 30px;
  }

  .login-box form p.form-title {
    color: #333333;
    font-family: "Josefin Sans", sans-serif;
    font-size: 42px;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 0;
  }

  .login-box form .ant-form-item-label > label.ant-form-item-required::before {
    display: none;
  }

  .login-box form .ant-form-item-control-input-content {
    text-align: left;
  }

  .login-box form .ant-input-affix-wrapper {
    padding: 12px 15px;
  }

  .login-box form #login-form_username {
    height: 24px;
  }

  .login-box form .ant-btn {
    height: 42px;
    letter-spacing: 1px;
    border-radius: 6px;
  }

  .login-form-button {
    width: 100%;
  }

  .illustration-wrapper {
    display: flex;
    align-items: flex-end;
    max-width: 800px;
    min-height: 100%;
    background-color: #fffdf2;
  }

  .illustration-wrapper img {
    display: block;
    width: 100%;
  }

  @media screen and (max-width: 1023px) {
    .login-box {
      flex-direction: column;
      box-shadow: none;
    }
    .illustration-wrapper {
      max-width: 100%;
      min-height: auto;
    }
    .login-box form {
      max-width: 100%;
    }
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
        <div className="login-page">
          <div className="login-box">
            <div className="illustration-wrapper">
              <img
                src="https://i.pinimg.com/736x/df/c6/21/dfc621af8a3bdadd85bc01b57fab975d.jpg"
                alt="Login"
              />
            </div>
            <Form
              size="large"
              name="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
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

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};
export default Login;
