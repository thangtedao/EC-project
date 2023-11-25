import React from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMainLayoutContext } from "../pages/MainLayout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 380px;
  background-color: var(--background-secondary-color);
  border: 0.5px solid lightgrey;
  border-radius: 10px;
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;

  .product-card-container {
    width: 100%;
    height: fit-content;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    gap: 1rem;
  }
  .product-card-image {
    width: 100%;
    text-align: center;
    overflow: hidden;
    max-height: 190px;
    img {
      width: 80%;
    }
  }
  .product-card-name {
    font-size: 1.05rem;
    font-weight: bold;
    color: black;
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
    left: 0px;
    background: url("src/assets/percent.svg") no-repeat;
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
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    padding: 5px;
    line-height: 1.5;
    border-radius: 3px;
    font-size: 12px;
    color: #444;
  }
  .wishlist-btn {
    color: #777;
    font-size: 12px;
    display: flex;
    align-items: center;
    .heart {
      color: #d70018;
    }
  }
  .product-card-bottom {
    max-height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ProductCard = ({ product }) => {
  const { user } = useMainLayoutContext();
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
        <div className="product-card-description">
          <p>{product.description}</p>
        </div>
      </NavLink>

      <div className="product-card-bottom">
        <ReactStars
          count={5}
          //onChange={ratingChanged}
          size={24}
          edit={false}
          activeColor="#ffd700"
        />
        <div className="wishlist-btn">
          Yêu Thích
          <IconButton className="heart" onClick={() => addToWishlist()}>
            <FavoriteIcon />
          </IconButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductCard;
