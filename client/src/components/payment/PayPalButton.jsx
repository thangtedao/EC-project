import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";

const PayPalPayment = ({ cartItem, coupon, totalAmount }) => {
  const navigate = useNavigate();

  const convertVNDToUSD = (vndAmount) => {
    const exchangeRate = 0.000041;
    const usdAmount = vndAmount * exchangeRate;
    return usdAmount.toFixed(2);
  };

  totalAmount = convertVNDToUSD(totalAmount);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    console.log(order);
    await customFetch.post("/order/create-order", { cartItem, coupon });
    navigate("/order");
  };

  return (
    <PayPalButtons
      style={{
        height: 40,
      }}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onCancel={() => console.log("Payment cancel")}
      onError={(err) => console.log(err)}
    />
  );
};

export default PayPalPayment;

// const createOrder = async (cart) => {
//   try {
//     // Order is created on the server and the order id is returned
//     const response = await customFetch.post(
//       "/order/create-paypal-order",
//       cart
//     );
//     return response.data.id;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// const onApprove = async (data) => {
//   try {
//     // Order is captured on the server and the response is returned to the browser
//     const response = await customFetch.post(
//       `/order/capture-paypal-order/${data.orderID}`
//     );

//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
