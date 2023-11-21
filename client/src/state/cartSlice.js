import { createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/customFetch";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.cart.find(
        (item) => item._id === action.payload.product._id
      );

      if (!product) {
        state.cart.push(action.payload.product);
      } else {
        product.count++;
      }

      const setCart = async () => {
        await customFetch.post("/user/cart", { cart: state.cart });
      };
      setCart();
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload.id);

      const setCart = async () => {
        await customFetch.post("/user/cart", { cart: state.cart });
      };
      setCart();
    },
    deleteCart: (state, action) => {
      state.cart = [];

      const setCart = async () => {
        await customFetch.delete("/user/empty-cart");
      };
      setCart();
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload.id) {
          item.count++;
        }
        return item;
      });

      const setCart = async () => {
        await customFetch.post("/user/cart", { cart: state.cart });
      };
      setCart();
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });

      const setCart = async () => {
        await customFetch.post("/user/cart", { cart: state.cart });
      };
      setCart();
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteCart,
  increaseCount,
  decreaseCount,
} = cartSlice.actions;
export default cartSlice.reducer;
