import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CartItem } from "../components";
import { redirect, useNavigate, useLoaderData } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/LogoNova.svg";
import customFetch from "../utils/customFetch";
import { debounce } from "lodash";

const Wrapper = styled.div`
  width: 650px;
  height: fit-content;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .cart-header {
    padding: 1rem;
    text-align: center;
    font-weight: 700;
    font-size: large;
    display: grid;
    grid-template-columns: auto 1fr;
    place-items: center;
    border-bottom: 1px solid lightgray;
  }
  .cart-empty {
    height: 500px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    font-size: large;
  }
  .cart-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .header-action {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .product-item-outer {
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 1rem 0;
    overflow: hidden;
  }
  .product-item {
    height: 100px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .checkbox-btn {
    width: 30px;
    height: 30px;
  }
  .product-image {
    text-align: center;
    margin-left: 10px;
    width: 20%;
    height: inherit;
    img {
      height: inherit;
    }
  }
  .product-info {
    width: 80%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .product-info-name {
    font-size: 1.05rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-info-price {
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-price {
    color: #cf0000;
    display: flex;
    gap: 1rem;
    .strike {
      font-size: 0.95rem;
      color: #707070;
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
  }
  .product-count {
    color: black;
    display: flex;
    input {
      width: 30px;
      text-align: center;
      font-size: 14px;
      border: transparent;
      background-color: transparent;
    }
    .count-btn {
      width: 30px;
      height: 30px;
      border-radius: 3px;
      background-color: #f3f3f3;
      display: grid;
      place-items: center;
      font-weight: lighter;
      cursor: pointer;
    }
  }
  .bottom-bar {
    width: 100%;
    align-self: flex-end;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: white;
    .btn {
      border-radius: 5px;
      border: none;
      background: #d70018;
      font-weight: bold;
      color: white;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
  .price-temp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
  }
`;

export const loader = async () => {
  try {
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    let cart;
    if (user) {
      const cartData = await customFetch
        .get("/cart/get-cart")
        .then(({ data }) => data);
      cart = cartData.cartItem;
    }
    window.scrollTo(0, 0);
    return { cart };
  } catch (error) {
    if (error?.response?.status === 401) return redirect("/login");
    return error;
  }
};

const CartContext = createContext();

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useLoaderData();
  const [cartItem, setCartItem] = useState(cart);
  const user = useSelector((state) => state.user.user);

  const totalPrice =
    cartItem?.reduce(
      (acc, item) =>
        acc +
        (item.variant?.reduce((a, i) => a + i.priceModifier, 0) +
          item.product.price) *
          item.quantity,
      0
    ) || 0;

  const totalItem =
    cartItem?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const submitPayment = () => {
    if (!user) navigate("/login");
    else navigate("payment");
  };

  const increaseQuantity = async (item, user) => {
    const cart = await customFetch
      .patch("/cart/inc-qty", {
        cartItem: item,
      })
      .then(({ data }) => data);
    cart && setCartItem(cart.cartItem);
  };

  const descreaseQuantity = async (item, user) => {
    const cart = await customFetch
      .patch("/cart/des-qty", {
        cartItem: item,
      })
      .then(({ data }) => data);
    cart && setCartItem(cart.cartItem);
  };

  const removeFromCart = async (item, user) => {
    const cart = await customFetch
      .patch("/cart/remove-from-cart", {
        cartItem: item,
      })
      .then(({ data }) => data);
    cart && setCartItem(cart.cartItem);
  };

  return (
    <CartContext.Provider
      value={{
        increaseQuantity,
        descreaseQuantity,
        removeFromCart,
      }}
    >
      <HelmetProvider>
        <Wrapper>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Cart</title>
            <link rel="icon" type="image/svg+xml" href={NovaIcon} />
          </Helmet>

          <div className="cart-header">
            <a onClick={() => navigate("/")}>
              <ArrowBackIcon />
            </a>
            Cart
          </div>
          {cartItem?.length <= 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <p>Hãy chọn thêm sản phẩm để mua sắm nhé</p>
            </div>
          ) : (
            <div className="cart-container">
              {/* <div className="header-action">
            <Checkbox
              className="checkbox-btn"
              icon={<CircleOutlinedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
            Chọn tất cả
          </div> */}

              {cartItem?.map((item, index) => {
                return <CartItem key={index} item={item} />;
              })}

              <div className="bottom-bar">
                <div className="price-temp">
                  <p>Total Price</p>
                  {totalPrice}₫
                </div>

                <button className="btn" onClick={() => submitPayment()}>
                  Buy Now {`(${totalItem})`}
                </button>
              </div>
            </div>
          )}
        </Wrapper>
      </HelmetProvider>
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export default Cart;
