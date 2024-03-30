import React from "react";
import styled from "styled-components";
import { FormRow } from "../components";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { store } from "../state/store.js";
import { login } from "../state/userSlice.js";
import { setCart, setCartTotal } from "../state/cartSlice.js";
import NovaIcon from "../assets/LogoNova.svg";

const Wrapper = styled.section`
  padding: 3rem;
  margin-bottom: 5rem;

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
      toast.success("Bạn đã bị block");
      await customFetch.get("/auth/logout");
      dispatch(logout());
      return redirect("/login");
    }
    if (token) {
      store.dispatch(login({ user: user, token: token }));
    }

    const response = await customFetch.get("/user/cart");
    if (response.data.cart) {
      const cart = response.data.cart?.products?.map((item) => {
        return {
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          salePrice: item.product.salePrice,
          images: item.product.images,
          count: item.count,
          category: item.product.category,
          slug: item.product.slug,
        };
      });
      store.dispatch(setCartTotal(response.data.cart.cartTotal));
      store.dispatch(setCart(cart));
    } else {
      store.dispatch(setCart([]));
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
          <h4>Đăng nhập</h4>
          <FormRow type="text" name="email" defaultValue="" />
          <FormRow type="password" name="password" defaultValue="" />
          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "đang đăng nhập..." : "đăng nhập"}
          </button>
          <p>
            Bạn chưa có tài khoản?
            <Link to="/register" className="member-btn">
              Đăng ký ngay
            </Link>
          </p>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Login;
