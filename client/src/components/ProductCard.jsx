import React from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";

const Wrapper = styled.div`
  width: 100%;
  .product-container {
    width: 98%;
    height: 380px;
    background-color: var(--background-secondary-color);
    border: 0.5px solid lightgrey;
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 0.5rem;
  }
  .product-content {
    width: 100%;
    height: 100%;
  }
  .image {
    width: 100%;
    height: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
    img {
      width: 10rem;
      height: 10rem;
    }
  }
  .name {
    margin: 5px 0;
    font-size: large;
  }
  .price {
    margin-top: 20%;
    font-size: large;
    color: red;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 10%;
    font-weight: 700;
  }
  .old-price {
    font-size: medium;
    color: gray;
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
  .descript {
    margin-top: 10%;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
    background: lightgray;
    padding: 0.5rem 0.25rem;
    border-radius: 5px;
    font-size: small;
  }
`;

const ProductContainer = ({ img, name, price, oldPrice, descript }) => {
  return (
    <Wrapper className="super-container">
      <div className="product-container">
        <div className="product-content">
          <div className="image">
            <img src={img} alt={name} />
          </div>
          <div className="name">
            <p> {name}</p>
          </div>
          <div className="price">
            <p> {price && price + "đ"}</p>
            <p className="old-price">{oldPrice && oldPrice + "đ"}</p>
          </div>
          <div className="descript">
            <p>{descript}</p>
          </div>
          <ReactStars
            count={5}
            //onChange={ratingChanged}
            size={24}
            edit={false}
            activeColor="#ffd700"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductContainer;
