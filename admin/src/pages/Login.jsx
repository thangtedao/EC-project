import React from "react";
import styled from "styled-components";
import { FormRow } from "../components";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { store } from "../state/store.js";
import { login } from "../state/userSlice.js";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);
    store.dispatch(login({ user: user }));
    return redirect("/");
  } catch (error) {
    return error;
  }
};

const Wrapper = styled.div`
  padding: 3rem;
  margin-bottom: 5rem;
  //height: 60vh;
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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
        </Helmet>

        <Form method="post" className="form-login">
          <h4>Đăng nhập</h4>
          <FormRow type="text" name="email" defaultValue="thang@gmail.com" />
          <FormRow type="password" name="password" defaultValue="thang123" />
          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "đang đăng nhập..." : "đăng nhập"}
          </button>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Login;
