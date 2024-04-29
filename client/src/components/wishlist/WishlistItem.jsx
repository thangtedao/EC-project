import React from "react";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item, removeFromWishlist }) => {
  return (
    <div className="product-item-outer">
      <img className="product-img" src={item?.images[0]} alt="Image" />

      <div className="product-info">
        <NavLink to={`/product/${item?._id}`}>{item?.name}</NavLink>

        <DeleteIcon
          className="remove-btn"
          onClick={() => removeFromWishlist(item._id)}
        />

        <div className="product-price">
          <span>
            {item.salePrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            <span style={{ fontSize: 15 }}>₫</span>
          </span>
          <span className="strike">
            {item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            <span style={{ fontSize: 12 }}>₫</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
