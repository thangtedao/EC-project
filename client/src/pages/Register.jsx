import React from "react";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

/* ACTION */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data); //axios.post("http://localhost:3001/auth/register", data);
    toast.success("Register successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

/* CSS */
const Wrapper = styled.section`
  align-items: center;
  min-height: 100vh;
  display: grid;
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;

const Register = () => {
  /* USE NAVIGATION */
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>Register</h4>
        <FormRow
          type="text"
          name="firstName"
          lableText="first name"
          defaultValue="thang"
        />
        <FormRow
          type="text"
          name="lastName"
          lableText="last name"
          defaultValue="xuan"
        />
        <FormRow type="text" name="location" defaultValue="earth" />
        <FormRow type="email" name="email" defaultValue="thang@gmail.com" />
        <FormRow type="password" name="password" defaultValue="thang123" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
