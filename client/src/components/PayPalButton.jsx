import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";

const PayPalPayment = ({ cart, user }) => {
  const navigate = useNavigate();

  const convertVNDToUSD = (vndAmount) => {
    const exchangeRate = 0.000041;
    const usdAmount = vndAmount * exchangeRate;
    return usdAmount.toFixed(2);
  };

  let totalPrice =
    cart?.reduce(
      (accumulator, item) => accumulator + item.salePrice * item.count,
      0
    ) || 0;

  totalPrice = convertVNDToUSD(totalPrice);
  console.log(totalPrice);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    await customFetch.post("/order/create-order", { cart, user });
    navigate("/order");
  };

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
