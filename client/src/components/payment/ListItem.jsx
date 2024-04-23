import React from "react";
import { NavLink } from "react-router-dom";

const CartItem = ({ item }) => {
  return (
    <div className="product-item-outer">
      <img className="product-img" src={item?.product?.images[0]} alt="Image" />

      <div className="product-info">
        <NavLink to={`/product/${item?.product?._id}`}>
          {item?.product?.name}
          <span>{item.variant && " - " + item.variant.variationValue}</span>
        </NavLink>

        <div className="product-price">
          <span>
            {(item.variant
              ? item.variant?.price + item.product.salePrice
              : item.product.salePrice
            )
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            <span style={{ fontSize: 15 }}>₫</span>
          </span>
          <span className="strike">
            {item.product.price}
            <span style={{ fontSize: 12 }}>₫</span>
          </span>
        </div>
      </div>

      <div className="product-quantity">{"x" + item?.quantity}</div>
    </div>
  );
};

export default CartItem;
