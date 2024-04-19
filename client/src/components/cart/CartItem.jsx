import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCartContext } from "../../pages/Cart";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item }) => {
  const user = useSelector((state) => state.user.user);
  const { increaseQuantity, descreaseQuantity, removeFromCart } =
    useCartContext();

  return (
    <div className="product-item-outer">
      <img className="product-img" src={item?.product?.images[0]} alt="Image" />

      <div className="product-info">
        <NavLink to={`/product/${item?.product?._id}`}>
          {item?.product?.name}
        </NavLink>

        <DeleteIcon
          className="remove-btn"
          onClick={() => removeFromCart(item, user)}
        />

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
            <span style={{ fontSize: 15 }}>₫</span>
          </span>
          <span className="strike">99999999</span>

          <div className="product-quantity">
            <span
              className="count-btn"
              onClick={() => descreaseQuantity(item, user)}
            >
              -
            </span>
            <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
              {item?.quantity}
            </span>
            <span
              className="count-btn"
              onClick={() => increaseQuantity(item, user)}
            >
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
