import React from "react";
import { debounce } from "lodash";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { pink } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "../state/cartSlice";

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
        {/* {!isPayment && (
          <Checkbox
            // sx={{
            //   color: pink[800],
            //   "&.Mui-checked": {
            //     color: pink[600],
            //   },
            // }}
            className="checkbox-btn"
            icon={<CircleOutlinedIcon />}
            checkedIcon={<CheckCircleIcon />}
          />
        )} */}

        <div className="product-image">
          <img src={product?.images[0]} alt="product image" />
        </div>

        <div className="product-info">
          <div className="product-info-name">
            {product?.name}
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
              <span>{product?.salePrice}đ</span>
              <span className="strike">{product?.price}đ</span>
            </div>
            {!isPayment ? (
              <div className="product-count">
                <span
                  className="count-btn"
                  onClick={
                    () => debouncedDecreaseCount(product._id, user)
                    //dispatch(decreaseCount({ id: product._id, user }))
                  }
                >
                  -
                </span>
                <input type="text" readOnly="readonly" value={product?.count} />
                <span
                  className="count-btn"
                  onClick={
                    () => debouncedIncreaseCount(product._id, user)
                    //dispatch(increaseCount({ id: product._id, user }))
                  }
                >
                  +
                </span>
              </div>
            ) : (
              <p>Số lượng: {product?.count}</p>
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
