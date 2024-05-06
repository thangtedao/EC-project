import React from "react";
import Wrapper from "../assets/wrappers/ProductCard.js";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import percent from "../assets/logo/percent.svg";

const ProductCard = ({ product }) => {
  const addToWishlist = async () => {
    try {
      const response = await customFetch.patch("/user/wishlist/add", {
        productId: product._id,
      });
      toast.success(response.data.msg);
    } catch (error) {
      if (error?.response?.status === 401) return toast.warning("Please Login");
      else return error;
    }
  };

  let salePrice = product.salePrice;

  return (
    <Wrapper>
      <NavLink
        to={`/product/${product._id}`}
        className="product-card-container"
      >
        <div className="product-card-image">
          <img src={product.images[0]} alt={product.name} />
        </div>

        <div className="product-card-name">{product.name}</div>

        <div className="product-card-price">
          <span>
            {salePrice
              ? salePrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              : product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            <span style={{ fontSize: 15 }}>₫</span>
          </span>

          <span className="strike">
            {salePrice &&
              product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            <span style={{ fontSize: 12 }}>₫</span>
          </span>

          {salePrice && (
            <div>
              <img className="product-price-percent" src={percent} />
              <span className="product-price-percent-value">
                <span>{"Giảm "}</span>
                {Math.round(
                  ((product.price - salePrice) / product.price) * 100
                )}
                %
              </span>
            </div>
          )}
        </div>
      </NavLink>

      <div className="product-card-bottom">
        <div className="product-rating">
          <Rating
            name="star"
            value={product?.totalRating || 0}
            size="small"
            icon={<FaStar />}
            emptyIcon={<FaRegStar />}
            readOnly
          />
        </div>

        <div className="wishlist-btn">
          Yêu Thích
          <FavoriteIcon className="heart" onClick={() => addToWishlist()} />
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductCard;
