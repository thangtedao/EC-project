import styled from "styled-components";

const Wrapper = styled.div`
  width: 650px;
  height: fit-content;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .header {
    padding: 1rem;
    font-weight: 700;
    font-size: large;
    display: grid;
    grid-template-columns: 0 1fr;
    place-items: center;
    border-bottom: 1px solid lightgray;
  }
  .cart-empty {
    height: 500px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    font-size: large;
  }
  .cart-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .header-action {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .product-item-outer {
    position: relative;
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
    gap: 1rem;
    height: 120px;
    border-radius: 10px;
    padding: 0.5rem 4rem 0.5rem 1rem;
  }
  .product-img {
    width: 100px;
    height: 100px;
    display: grid;
    place-items: center;
  }
  .product-info {
    width: 70%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.75rem;
  }
  .remove-btn {
    position: absolute;
    right: 10px;
    top: 15px;
    cursor: pointer;
  }
  .product-variant {
    display: flex;
    gap: 1rem;
  }
  .product-price {
    font-size: 1.05rem;
    font-weight: 500;
    display: flex;
    gap: 1.5rem;
    align-items: center;

    .strike {
      font-size: 0.95rem;
      color: #707070;
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
  }
  .product-quantity {
    position: absolute;
    bottom: 20px;
    right: 10px;
    width: 90px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;

    .count-btn {
      width: 30px;
      height: 30px;
      border-radius: 3px;
      background-color: #f3f3f3;
      display: grid;
      place-items: center;
      font-weight: lighter;
      cursor: pointer;
    }
  }

  .bottom-bar {
    width: 100%;
    align-self: flex-end;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: white;
    .btn {
      border-radius: 5px;
      border: none;
      background: #d70018;
      font-weight: bold;
      color: white;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
  .price-temp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
  }
`;

export default Wrapper;
