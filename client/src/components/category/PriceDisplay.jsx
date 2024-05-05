import React from "react";

const PriceDisplay = ({ value }) => {
  return (
    <div style={{ width: "500px" }}>
      <span>Min: {formatPrice(value[0])}</span>
      <br></br>
      <span>Max: {formatPrice(value[1])}</span>
    </div>
  );
};

const formatPrice = (value) => {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
  });
};

export default PriceDisplay;
