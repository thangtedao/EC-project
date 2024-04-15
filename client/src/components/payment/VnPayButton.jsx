import React from "react";
import customFetch from "../../utils/customFetch";

const VnPayButton = ({ totalPrice }) => {
  const handleCheckoutVnPay = async (totalPrice) => {
    try {
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
    <div>
      <button className="btn" onClick={() => handleCheckoutVnPay(totalPrice)}>
        VNPAY
      </button>
    </div>
  );
};

export default VnPayButton;
