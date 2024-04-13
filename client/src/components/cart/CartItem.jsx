import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCartContext } from "../../pages/Cart";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item, isPayment }) => {
  const user = useSelector((state) => state.user.user);
  const { increaseQuantity, descreaseQuantity, removeFromCart } =
    useCartContext();

  return (
    <div className="product-item-outer">
      <div className="product-item">
        <div className="product-image">
          <img src={item?.product?.images[0]} alt="product image" />
        </div>

        <div className="product-info">
          <div className="product-info-name">
            <NavLink
              to={`/product/${item?.product?._id}`}
              style={{ width: "70%" }}
            >
              {item?.product?.name}
            </NavLink>

            <DeleteIcon
              sx={{ cursor: "pointer" }}
              onClick={() => removeFromCart(item, user)}
            />
          </div>

          <div>
            {item?.variant?.map((i) => {
              return <div key={i._id}>{i.variationValue}</div>;
            })}
          </div>

          <div className="product-info-price">
            <div className="main-price">
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

            <div className="product-count">
              <span
                className="count-btn"
                onClick={() => descreaseQuantity(item, user)}
              >
                -
              </span>
              <input type="text" readOnly="readonly" value={item?.quantity} />
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

      <div className="block-combo-promotion">
        <div className="combo-promotion-title"></div>
        <div className="list-combo"></div>
      </div>
    </div>
  );
};

export default CartItem;
