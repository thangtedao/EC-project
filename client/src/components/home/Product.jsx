import React from "react";
import styled from "styled-components";
import SlideProduct from "../slider/SlideProduct";
import DoubleSlideProduct from "../slider/DoubleSlideProduct";
import { useHomeContext } from "../../pages/Home";

const Wrapper = styled.div`
  width: 100%;

  /* PRODUCTS */
  .product-list-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .product-list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-list-category {
    display: flex;
    gap: 0.5rem;
  }
  .category {
    border-radius: 10px;
    padding: 0.5rem;
    border: 0.5px solid lightgrey;
  }
`;

const Product = ({ title, products }) => {
  const categories = useHomeContext();

  let newCategory = categories;
  if (categories.length > 5) {
    newCategory = categories.slice(0, 5);
  }

  const check = products.length >= 12;

  return (
    <Wrapper>
      <div className="product-list-container">
        <div className="product-list-title">
          <h5>{title}</h5>
          <div>
            {categories.length < 5 ? (
              <div className="product-list-category">
                {categories.map((category) => {
                  return <div className="category">{category.name}</div>;
                })}
              </div>
            ) : (
              <div className="product-list-category">
                {newCategory.map((category) => {
                  return <div className="category">{category.name}</div>;
                })}
                <div className="category">Xem tất cả</div>
              </div>
            )}
          </div>
        </div>
        {check ? (
          <DoubleSlideProduct products={products} />
        ) : (
          <SlideProduct products={products} />
        )}
      </div>
    </Wrapper>
  );
};

export default Product;
