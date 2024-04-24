import React from "react";
import styled from "styled-components";
import { useNavigation, Link, Form } from "react-router-dom";
// import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../assets/logo/LogoAdmin2.svg";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import Wrapper from "../assets/wrappers/Login.js";
// import customFetch from "../utils/customFetch.js";
// import { store } from "../state/store.js";
// import { login } from "../state/userSlice.js";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const token = await customFetch
      .post("/auth/login", data)
      .then(({ data }) => data.token);

    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    if (user.isBlocked) {
      toast.success("You are blocked");
      await customFetch.get("/auth/logout");
      return redirect("/login");
    }

    if (token) {
      store.dispatch(
        login({
          user: { fullName: user.fullName, avatar: user.avatar, _id: user._id },
          token: token,
        })
      );
    }

    toast.success("Login successful");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg, {
      position: "top-center",
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
    return error;
  }
};

const Login = () => {
  window.scrollTo(0, 0);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  //
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //
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
              method="post"
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <Typography>Welcome to the </Typography>
              <Typography className="form-title"> Nova Store </Typography>
              {/* <Form.Item
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
                /> */}
              <TextField
                size="large"
                name="email"
                label="Email"
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              {/* </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              > */}
              {/* <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              /> */}
              <FormControl
                sx={{ width: "100%", margin: "20px 0 20px 0" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {/* </Form.Item> */}

              <div
                name="remember"
                valuePropName="checked"
                style={{ margin: "0 0 10px 0" }}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember me"
                />
              </div>

              <div>
                <Button
                  size="large"
                  variant="contained"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Login
                </Button>
              </div>
              <div style={{ margin: "10px 0 20px 0" }}>
                <p>
                  Don't have account?&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/register" className="member-btn">
                    Register Now
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};
export default Login;
