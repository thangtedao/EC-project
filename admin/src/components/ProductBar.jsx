import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 1rem 0;
  .product-item {
    height: 120px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .product-image {
    margin-left: 10px;
    width: 20%;
    img {
      width: 150px;
    }
  }
  .product-info {
    width: 80%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .product-info-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-info-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-price {
    color: #cf0000;
    display: flex;
    gap: 1rem;
    .strike {
      text-decoration: line-through;
    }
  }
  .product-count {
    color: black;
    display: flex;
    input {
      width: 30px;
      text-align: center;
      font-size: 14px;
      border: transparent;
      background-color: transparent;
    }
    .count-btn {
      width: 30px;
      height: 30px;
      border-radius: 3px;
      background-color: lightgray;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }
`;

const ProductBar = ({ product }) => {
  return (
    <Wrapper>
      <div className="product-item">
        <div className="product-image">
          <img src={product?.images[0]} alt="product image" />
        </div>

        <div className="product-info">
          <div className="product-info-name">{product?.name}</div>
          <div className="product-info-price">
            <div className="main-price">
              <span>{product?.salePrice}đ</span>
              <span className="strike">{product?.price}đ</span>
            </div>
            <p>Số lượng: {product?.count}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductBar;
