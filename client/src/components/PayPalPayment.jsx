import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import customFetch from "../utils/customFetch";

const PayPalPayment = () => {
  const createOrder = async (cart) => {
    try {
      // Order is created on the server and the order id is returned
      const response = await customFetch.post(
        "/order/create-paypal-order",
        cart
      );
      return response.data.id;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const onApprove = async (data) => {
    try {
      // Order is captured on the server and the response is returned to the browser
      const response = await customFetch.post(
        `/order/capture-paypal-order/${data.orderID}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PayPalPayment;
