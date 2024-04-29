import styled from "styled-components";

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
    line-height: 1.5;
    height: 3rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: #444;
  }
  .product-card-price {
    margin-top: 15px;
    font-size: 1rem;
    color: #d70018;
    display: flex;
    gap: 0.5rem;
    font-weight: bold;
  }
  .strike {
    font-size: 0.8rem;
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
    /* background: url("/src/assets/logo/percent.svg") 50% no-repeat; */
  }
  .product-price-percent-value {
    font-weight: bold;
    font-size: 0.8rem;
    color: white;
    position: absolute;
    width: 80px;
    top: 12px;
    left: 5px;
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

export default Wrapper;
