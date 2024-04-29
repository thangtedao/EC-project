import styled from "styled-components";

const Wrapper = styled.div`
  width: 650px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;

  .title {
    width: 100%;
    font-size: large;
    font-weight: bold;
    text-align: center;
  }
  .order-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .order-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0 3rem 0;
    border-bottom: 2px solid #e04040;
  }
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
  }
  .order-header-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: bold;
  }

  .product-item-outer {
    position: relative;
    background-color: white;
    border: 1px solid rgba(145, 158, 171, 0.239);
    display: flex;
    gap: 1rem;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    height: 120px;
  }
  .product-image {
    width: 100px;
    height: 100px;
    display: grid;
    place-items: center;
  }
  .product-info {
    width: 70%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    padding-top: 0.75rem;
    gap: 1rem;
  }
  .product-variant {
    font-size: 0.95rem;
    display: flex;
    gap: 1rem;
  }
  .product-price {
    color: #d70018;
    font-weight: 400;
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
    right: 15px;
    bottom: 50px;
    display: grid;
    place-items: center;
  }

  .normal-text {
    font-weight: 500;
    color: #4d4b4b;
  }

  .order-empty {
    height: 600px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    font-size: large;
  }
`;

export default Wrapper;
