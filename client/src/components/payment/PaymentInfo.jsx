import React from "react";
import { NavLink } from "react-router-dom";

const PaymentInfo = ({ cartItem }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {cartItem?.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              width: "100%",
              height: 200,
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              style={{ width: 100 }}
              src={item?.product?.images[0]}
              alt="product image"
            />

            <NavLink
              to={`/product/${item?.product?._id}`}
              style={{ width: "70%" }}
            >
              {item?.product?.name}
            </NavLink>

            <div>
              {item.variant?.length > 0 &&
                item.variant.map((i) => {
                  return <div key={i._id}>{i.variationValue}</div>;
                })}
            </div>

            <span>
              {(
                (item.variant?.reduce((a, i) => a + i.priceModifier, 0) +
                  item.product.price) *
                item.quantity
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              ₫
            </span>

            <span>
              {item?.product?.salePrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              ₫
            </span>

            <span className="strike">
              {item?.product?.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              ₫
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentInfo;
