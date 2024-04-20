import React, { createContext, useContext, useState } from "react";
import Wrapper from "../assets/wrappers/Cart.js";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CartItem } from "../components";
import { redirect, useNavigate, useLoaderData } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/logo/LogoNova.svg";
import customFetch from "../utils/customFetch";
import { debounce } from "lodash";

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
    else navigate("/payment");
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

          <div className="header">
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
