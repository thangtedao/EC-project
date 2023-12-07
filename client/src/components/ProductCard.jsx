import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import { NavLink, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 380px;
  background-color: var(--background-secondary-color);
  border: 0.5px solid lightgrey;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  padding: 0.5rem;

  .product-card-container {
    width: 100%;
    height: 90%;
    background-color: var(--background-secondary-color);
    display: flex;
    flex-direction: column;
    padding-top: 1.2rem;
    overflow: hidden;
    gap: 1rem;
  }
  .product-card-image {
    height: 135px;
    display: grid;
    place-items: center;
    img {
      border-radius: 10px;
      height: inherit;
    }
  }
  .product-card-name {
    font-weight: bold;
    color: #444;
  }
  .product-card-price {
    font-size: 1.1rem;
    color: #d70018;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    font-weight: bold;
  }
  .strike {
    font-size: 0.9rem;
    color: #707070;
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
  .product-price-percent {
    position: absolute;
    width: 80px;
    height: 31px;
    top: 5px;
    left: -2px;
    background: url("/src/assets/percent.svg") 50% no-repeat;
    color: white;
    font-size: small;
    font-weight: bold;
    p {
      margin-top: 6px;
      width: 100%;
      text-align: center;
    }
  }
  .product-card-description {
    width: 100%;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    padding: 5px;
    line-height: 1.5;
    border-radius: 3px;
    font-size: 12px;
    color: #444;
    overflow-wrap: break-word;
  }
  .product-card-bottom {
    width: 100%;
    max-height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-rating {
    width: 24px;
  }
  .wishlist-btn {
    color: #777;
    font-size: 12px;
    display: flex;
    align-items: center;
    .heart {
      margin-left: 2px;
      color: #d70018;
      cursor: pointer;
    }
  }
`;

const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const addToWishlist = async () => {
    if (!user) {
      navigate("/login");
    }
    try {
      await customFetch.patch("/user/wishlist", {
        productId: product._id,
      });
      toast.success("Đã thêm sản phẩm yêu thich", {
        position: "top-center",
        autoClose: 1000,
        pauseOnHover: false,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <Wrapper>
      <NavLink
        to={`/product/${product.slug}`}
        className="product-card-container"
      >
        <div className="product-card-image">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="product-card-name">
          <p> {product.name}</p>
        </div>
        <div className="product-card-price">
          <p>
            {product.salePrice ? product.salePrice + "₫" : product.price + "₫"}
          </p>
          <p className="strike">{product.salePrice && product.price + "₫"}</p>
          {product.salePrice && (
            <div className="product-price-percent">
              <p>
                <span>{"Giảm "}</span>
                {Math.round(
                  ((product.price - product.salePrice) / product.price) * 100
                )}
                %
              </p>
            </div>
          )}
        </div>
        {/* {product.description && (
          <div className="product-card-description">
            <p>{product.description}</p>
          </div>
        )} */}
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
