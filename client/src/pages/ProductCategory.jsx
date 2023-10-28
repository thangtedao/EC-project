import React from "react";
import styled from "styled-components";
import NavLinks from "../components/NavLinks";
import { products } from "../assets/data/data";
import { categoryData } from "../assets/data/categoryData";
import { AllProduct, SlideProduct } from "../components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 1100px;
  height: 100%;
  border: 1px solid green;

  .block-top-filter-brands {
    width: 100%;
  }
  .brands-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .nav-link {
    width: 10%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid lightgray;
    img {
      width: 100%;
      height: auto;
    }
  }

  /* HOT SALE */
  .block-hot-sale {
    width: 100%;
    border-radius: 10px;
    background-color: #580f0f;
    //border: 0.5px solid yellowgreen;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0.75rem;
  }
  .block-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  .sale-title {
    font-size: 2rem;
    font-weight: 700;
    color: red;
  }
  .box-countdown {
  }

  /* MEDIA QUERIES */
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

const ProductCategory = () => {
  const numOfProduct = products.length;

  return (
    <Wrapper>
      <div className="block-top-filter-brands">
        <div className="brands-list">
          {categoryData.map((item) => {
            return <NavLinks image={item.image} />;
          })}
        </div>
      </div>

      {/* --------- HOT SALE -------- */}
      <div className="block-hot-sale">
        <div className="block-title">
          <div className="sale-title">HOT SALE</div>
          <div className="box-countdown">00:11:22:33</div>
        </div>
        {numOfProduct > 0 && <SlideProduct products={products} />}
      </div>

      {/* --------- ALL PRODUCTS -------- */}
      <AllProduct products={products} />
    </Wrapper>
  );
};

export default ProductCategory;
