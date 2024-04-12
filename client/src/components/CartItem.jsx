import React from "react";
import { debounce } from "lodash";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../state/cartSlice";

const CartItem = ({ item, isPayment }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const debouncedDecreaseQuantity = debounce((item, user) => {
    dispatch(decreaseQuantity({ item, user }));
  }, 300);

  const debouncedIncreaseQuantity = debounce((item, user) => {
    dispatch(increaseQuantity({ item, user }));
  }, 300);

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

            {!isPayment && (
              <DeleteIcon
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(removeFromCart({ item, user }))}
              />
            )}
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

            {!isPayment ? (
              <div className="product-count">
                <span
                  className="count-btn"
                  onClick={() => debouncedDecreaseQuantity(item, user)}
                >
                  -
                </span>
                <input type="text" readOnly="readonly" value={item?.quantity} />
                <span
                  className="count-btn"
                  onClick={() => debouncedIncreaseQuantity(item, user)}
                >
                  +
                </span>
              </div>
            ) : (
              <div className="count">Số lượng: {item?.quantity}</div>
            )}
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
