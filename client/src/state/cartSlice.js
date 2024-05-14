import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: null,
  coupon: null,
  address: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItem = action.payload.cartItem;
      state.coupon = action.payload.coupon;
      state.address = action.payload.address;
    },
    removeCart: (state, action) => {
      state.cartItem = null;
      state.coupon = null;
      state.address = null;
    },
  },
});

export const { setCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
