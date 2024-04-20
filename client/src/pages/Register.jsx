import React from "react";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/Register.js";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { TextField } from "@mui/material";
import NovaIcon from "../assets/logo/LogoNova.svg";

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

const Register = () => {
  window.scrollTo(0, 0);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Register</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <Form method="post" className="form-register">
          <h3>Register</h3>
          <TextField
            required
            size="small"
            name="fullName"
            label="Full Name"
            sx={{ width: "100%" }}
          />
          <TextField
            required
            size="small"
            name="phone"
            label="Phone Number"
            sx={{ width: "100%" }}
          />
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
          <button
            type="submit"
            className="btn btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Register..." : "Register"}
          </button>
          <p>
            Already have account?
            <Link to="/login" className="member-btn">
              Login Now
            </Link>
          </p>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Register;
