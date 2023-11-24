import React from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  .product-card-container {
    width: 100%;
    height: 380px;
    background-color: var(--background-secondary-color);
    border: 0.5px solid lightgrey;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 0.5rem;
    gap: 1rem;
  }
  .product-card-image {
    width: 100%;
    display: grid;
    place-items: center;
    overflow: hidden;
    img {
      width: 80%;
      height: 100%;
    }
  }
  .product-card-name {
    font-size: large;
    color: black;
  }
  .product-card-price {
    font-size: large;
    color: red;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    font-weight: 500;
  }
  .strike {
    font-size: medium;
    color: gray;
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
  .product-price-percent {
    position: absolute;
    width: 80px;
    height: 31px;
    top: 1px;
    left: 0px;
    background-color: red;
    color: white;
  }
  .product-card-description {
    border: transparent;
    background: #ebebeb;
    padding: 0.5rem 0.25rem;
    border-radius: 3px;
    font-size: small;
    color: black;
  }
  .wishlist-btn {
    color: black;
    font-size: small;
    display: flex;
    align-items: center;
    .heart {
      color: red;
    }
  }
`;

const ProductCard = ({ product }) => {
  return (
    <NavLink to={`/product/${product.slug}`}>
      <Wrapper>
        <div className="product-card-container">
          <div className="product-card-image">
            <img src={product.images[0]} alt={product.name} />
          </div>
          <div className="product-card-name">
            <p> {product.name}</p>
          </div>
          <div className="product-card-price">
            <p>
              {product.salePrice
                ? product.salePrice + "đ"
                : product.price + "đ"}
            </p>
            <p className="strike">{product.salePrice && product.price + "đ"}</p>
            <div className="product-price-percent">
              Giảm
              {Math.round(
                ((product.price - product.salePrice) / product.price) * 100
              )}
              %
            </div>
          </div>
          <div className="product-card-description">
            <p>{product.description}</p>
          </div>

          <ReactStars
            count={5}
            //onChange={ratingChanged}
            size={24}
            edit={false}
            activeColor="#ffd700"
          />
          <div className="wishlist-btn">
            Yêu Thích
            <IconButton className="heart">
              <FavoriteIcon />
            </IconButton>
          </div>
        </div>
      </Wrapper>
    </NavLink>
  );
};

export default ProductCard;
