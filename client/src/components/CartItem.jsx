import React from "react";
import { debounce } from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "../state/cartSlice";
import { NavLink, useNavigate } from "react-router-dom";

const ProductCart = ({ product, isPayment }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const debouncedDecreaseCount = debounce((id, user) => {
    dispatch(decreaseCount({ id, user }));
  }, 300);

  const debouncedIncreaseCount = debounce((id, user) => {
    dispatch(increaseCount({ id, user }));
  }, 300);

  return (
    <div className="product-item-outer">
      <div className="product-item">
        <div className="product-image">
          <img src={product?.images[0]} alt="product image" />
        </div>

        <div className="product-info">
          <div className="product-info-name">
            <NavLink to={`/product/${product?.slug}`} style={{ width: "70%" }}>
              {product?.name}
            </NavLink>
            {!isPayment && (
              <DeleteIcon
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch(removeFromCart({ id: product._id, user }))
                }
              />
            )}
          </div>
          <div className="product-info-price">
            <div className="main-price">
              <span>{product?.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</span>
              <span className="strike">{product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</span>
            </div>
            {!isPayment ? (
              <div className="product-count">
                <span
                  className="count-btn"
                  onClick={() => debouncedDecreaseCount(product._id, user)}
                >
                  -
                </span>
                <input type="text" readOnly="readonly" value={product?.count} />
                <span
                  className="count-btn"
                  onClick={() => debouncedIncreaseCount(product._id, user)}
                >
                  +
                </span>
              </div>
            ) : (
              <div className="count">Số lượng: {product?.count}</div>
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

export default ProductCart;
