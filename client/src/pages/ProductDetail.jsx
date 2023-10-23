import React from "react";
import styled from "styled-components";
import img from "../assets/react.svg";
import ProductType from "../components/productDetail/ProductType";
import RelatedProduct from "../components/productDetail/RelatedProduct";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  flex-direction: column;
  padding: 20px;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
  }
  .main-img {
    display: grid;
    width: 40vw;
    height: 50vh;
    border: 1px solid white;
  }
  .column-first {
    display: flex;
    flex-direction: row-reverse;
  }
  .column-second {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid white;
  }
  .list-item {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .price {
    padding: 0.5rem 0;
    border: 1px solid white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-weight: 400;
    color: red;
    width: 30%;
  }
  .old-price {
    font-size: 0.8rem;
    font-weight: 5;
    color: gray;
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
`;

const ProductDetail = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="column-first">
          <img className="main-img" src={img} />
        </div>
        <div className="column-second">
          <div>
            <ul className="list-item">
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
            </ul>
          </div>
          <p>Chọn màu</p>
          <div>
            <ul className="list-item">
              <li>
                <ProductType img={img} text="Vàng" price="9999đ" />
              </li>
              <li>
                <ProductType img={img} text="Vàng" price="9999đ" />
              </li>
              <li>
                <ProductType text="Vàng" price="9999đ" />
              </li>
            </ul>
          </div>
          <div className="price">
            <p>999đ</p>
            <p className="old-price">9999đ</p>
          </div>
          <div>
            <button>Mua ngay</button>
            <button>Thâm vào giỏ</button>
          </div>
        </div>
      </div>

      <div>
        <RelatedProduct img={img} />
      </div>
    </Wrapper>
  );
};

export default ProductDetail;
