import { createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/customFetch";

const initialState = {
  cartItem: null,
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItem = action.payload.cartItem;
    },

    addToCart: async (state, action) => {
      if (action.payload.user) {
        const cart = await customFetch
          .post("/cart/add-to-cart", {
            product: action.payload.product,
            variant: action.payload.variant, // array
          })
          .then(({ data }) => data);
      }
    },

    removeFromCart: async (state, action) => {
      if (action.payload.user) {
        const cart = await customFetch
          .post("/cart/remove-from-cart", {
            cartItem: action.payload.item,
          })
          .then(({ data }) => data);
        state.cartItem = cart.cartItem;
      }
    },

    emptyCart: (state, action) => {
      state.cartItem = [];
    },

    increaseQuantity: async (state, action) => {
      if (action.payload.user) {
        const cart = await customFetch
          .post("/cart/inc-qty", {
            cartItem: action.payload.item,
          })
          .then(({ data }) => data);
        state.cartItem = cart.cartItem;
      }
    },

    decreaseQuantity: async (state, action) => {
      if (action.payload.user) {
        const cart = await customFetch
          .post("/cart/des-qty", {
            cartItem: action.payload.item,
          })
          .then(({ data }) => data);
        state.cartItem = cart.cartItem;
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
