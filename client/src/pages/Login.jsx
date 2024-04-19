import React from "react";
import Wrapper from "../assets/wrappers/Login.js";
import customFetch from "../utils/customFetch.js";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { store } from "../state/store.js";
import { login } from "../state/userSlice.js";
import { TextField } from "@mui/material";
import NovaIcon from "../assets/logo/LogoNova.svg";

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

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <Form method="post" className="form-login">
          <h3>Login</h3>
          <TextField
            required
            size="small"
            name="email"
            label="Email"
            sx={{ width: "100%" }}
          />
          <TextField
            required
            type="password"
            size="small"
            name="password"
            label="Password"
            sx={{ width: "100%" }}
          />
          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "..." : "Login"}
          </button>
          <p>
            Don't have account?
            <Link to="/register" className="member-btn">
              Register Now
            </Link>
          </p>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Login;
