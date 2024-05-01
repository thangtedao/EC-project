import React from "react";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../../pages/Cart";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item }) => {
  const { increaseQuantity, descreaseQuantity, removeFromCart } =
    useCartContext();

  let salePrice = item.product.salePrice;
  if (item.product.pmtPrice) salePrice = item.product.pmtPrice;

  return (
    <div className="product-item-outer">
      <img className="product-img" src={item?.product?.images[0]} alt="Image" />

      <div className="product-info">
        <NavLink to={`/product/${item?.product?._id}`}>
          {item?.product?.name}
          <span>{item.variant && " - " + item.variant.variationValue}</span>
        </NavLink>

        <DeleteIcon
          className="remove-btn"
          onClick={() => removeFromCart(item)}
        />

        <div className="product-price">
          <span>
            {(item.variant ? item.variant?.price + salePrice : salePrice)
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            <span style={{ fontSize: 15 }}>₫</span>
          </span>
          <span className="strike">
            {item.product.price
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            <span style={{ fontSize: 12 }}>₫</span>
          </span>

          <div className="product-quantity">
            <span className="count-btn" onClick={() => descreaseQuantity(item)}>
              -
            </span>
            <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
              {item?.quantity}
            </span>
            <span className="count-btn" onClick={() => increaseQuantity(item)}>
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
