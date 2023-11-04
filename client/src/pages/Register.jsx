import React from "react";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

/* ACTION */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Register successful");
    return redirect("/login");
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

const Wrapper = styled.section`
  padding: 3rem;
  margin-bottom: 2rem;
  //height: 60vh;
  .form-register {
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

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Register</title>
        </Helmet>

        <Form method="post" className="form-register">
          <h4>Đăng ký</h4>
          <FormRow
            type="text"
            name="fullName"
            lableText="Họ và Tên"
            defaultValue="xuan thang"
          />
          <FormRow
            type="text"
            name="phone"
            lableText="Số điện thoại"
            defaultValue="0123456789"
          />
          <FormRow type="email" name="email" defaultValue="thang@gmail.com" />
          <FormRow type="password" name="password" defaultValue="thang123" />
          <button
            type="submit"
            className="btn btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? "đang đăng ký..." : "đăng ký"}
          </button>
          <p>
            Bạn đã có tài khoản?
            <Link to="/login" className="member-btn">
              Đăng nhập ngay
            </Link>
          </p>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Register;
