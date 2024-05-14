import React from "react";
import customFetch from "../../utils/customFetch";
import vnpay from "../../assets/logo/vnpay.png";
import { useDispatch } from "react-redux";
import { setCart } from "../../state/cartSlice";

const VnPayButton = ({ totalPrice, cartItem, coupon, address }) => {
  const dispatch = useDispatch();

  const handleCheckoutVnPay = async (totalPrice) => {
    try {
      dispatch(setCart({ cartItem, coupon, address }));
      const paymentUrl = await customFetch
        .post("/order/create_payment_url", {
          amount: totalPrice,
          bankCode: "",
          language: "vn",
        })
        .then(({ data }) => data.redirectUrl);

      window.location.href = paymentUrl;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <button
      className="vnpay-btn"
      onClick={() => handleCheckoutVnPay(totalPrice)}
    >
      <img src={vnpay} />
    </button>
  );
};

export default VnPayButton;
