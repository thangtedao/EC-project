import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import { useDashboardContext } from "../pages/DashboardLayout";
import { MdModeEditOutline } from "react-icons/md";

const Wrapper = styled.div`
  width: 100%;

  .product-card-container {
    width: 100%;
    height: 380px;
    background-color: var(--background-secondary-color);
    border: 0.5px solid lightgrey;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    padding: 1rem;
    gap: 1rem;
  }
  .product-card-image {
    height: 120px;
    display: grid;
    place-items: center;
    img {
      border-radius: 10px;
      height: inherit;
    }
  }
  .product-card-name {
    font-size: 18px;
    font-weight: bold;
    color: #031123;
  }
  .product-card-info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    font-weight: bolder;
    font-size: 0.9rem;
    color: #515c6b;
  }
  .btn-action {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    button {
      min-width: 80px;
      font-weight: bolder;
      border-radius: 23px;
      background: white;
      height: 38px;
      cursor: pointer;
      transition: 0.3s ease-in-out;
    }
    .ed-btn {
      border: 2px solid #035ecf;
      color: #035ecf;
      :hover {
        background-color: #035ecf;
        color: white;
      }
    }
    .dl-btn {
      border: 2px solid #ff5470;
      color: #ff5470;
      :hover {
        background-color: #ff5470;
        color: white;
      }
    }
  }
`;

const ProductCard = ({ product }) => {
  const { deleteProduct } = useDashboardContext();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="product-card-container">
        <div className="product-card-image">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="product-card-name">
          <p> {product.name}</p>
        </div>
        <div className="product-card-info">
          <div className="item-info">
            {"Available: " + product.stockQuantity}
          </div>
          <div className="item-info">{"Sold: " + product.sold + "₫"}</div>
          <div className="item-info">
            {"Regular price: " + product.price + "₫"}
          </div>
          <div className="item-info">
            {"Sale price: " + product.salePrice + "₫"}
          </div>
        </div>
        <div className="btn-action">
          <button
            className="ed-btn"
            onClick={() => navigate(`/edit-product/${product.slug}`)}
          >
            <MdModeEditOutline /> Edit
          </button>
          <button className="dl-btn" onClick={() => deleteProduct(product._id)}>
            Delete
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductCard;
