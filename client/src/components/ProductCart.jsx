import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { pink } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "../state/cartSlice";

const ProductCart = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-item-outer">
      <div className="product-item">
        <Checkbox
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
          className="checkbox-btn"
          icon={<CircleOutlinedIcon />}
          checkedIcon={<CheckCircleIcon />}
        />

        <div className="product-image">
          <img src={product?.images[0]} alt="product image" />
        </div>

        <div className="product-info">
          <div className="product-info-name">
            {product?.name}
            <DeleteIcon
              sx={{ cursor: "pointer" }}
              onClick={() => dispatch(removeFromCart({ id: product._id }))}
            />
          </div>
          <div className="product-info-price">
            {product?.price}
            <div className="product-count">
              <span
                className="count-btn"
                onClick={() => dispatch(decreaseCount({ id: product._id }))}
              >
                -
              </span>
              <input type="text" readOnly="readonly" value={product?.count} />
              <span
                className="count-btn"
                onClick={() => dispatch(increaseCount({ id: product._id }))}
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

export default ProductCart;
