import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: null,
  coupon: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItem = action.payload.cartItem;
      state.coupon = action.payload.coupon;
    },
    removeCart: (state, action) => {
      state.cartItem = null;
      state.coupon = null;
    },
  },
});

export const { setCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
