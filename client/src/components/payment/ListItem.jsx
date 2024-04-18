import React from "react";
import { NavLink } from "react-router-dom";

const CartItem = ({ item }) => {
  return (
    <div className="product-item-outer">
      <img className="product-img" src={item?.product?.images[0]} alt="Image" />

      <div className="product-info">
        <NavLink to={`/product/${item?.product?._id}`}>
          {item?.product?.name}
        </NavLink>

        <div className="product-variant">
          {item.variant?.map((i, index) => {
            return <div key={index}>{i.variationValue}</div>;
          })}
        </div>

        <div className="product-price">
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

          <span className="strike">9999999999</span>
        </div>
      </div>

      <div className="product-quantity">{"x" + item?.quantity}</div>
    </div>
  );
};

export default CartItem;
