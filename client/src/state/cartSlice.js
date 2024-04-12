import { createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/customFetch";

const initialState = {
  cart: [],
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload.cart;
    },

    addToCart: (state, action) => {
      if (action.payload.user) {
        const setCart = async () => {
          const cart = await customFetch.post("/cart/add-to-cart", {
            product: action.payload.product,
            variant: action.payload.variant,
          });
          setCart(cart);
        };
      }
    },

    removeFromCart: (state, action) => {
      if (action.payload.user) {
        const setCart = async () => {
          const cart = await customFetch.post("/cart/remove-from-cart", {
            cartItem: action.payload.item,
          });
          setCart(cart);
        };
      }
    },

    emptyCart: (state, action) => {
      state.cart = [];
    },

    increaseQuantity: (state, action) => {
      if (action.payload.user) {
        const setCart = async () => {
          const cart = await customFetch.post("/cart/inc-qty", {
            cartItem: action.payload.item,
          });
          setCart(cart);
        };
      }
    },

    decreaseQuantity: (state, action) => {
      if (action.payload.user) {
        const setCart = async () => {
          const cart = await customFetch.post("/cart/des-qty", {
            cartItem: action.payload.item,
          });
          setCart(cart);
        };
      }
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  emptyCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
