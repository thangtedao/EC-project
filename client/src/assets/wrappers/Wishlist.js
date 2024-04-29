import styled from "styled-components";

const Wrapper = styled.div`
  width: 650px;
  height: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    width: 100%;
    font-size: large;
    font-weight: bold;
    text-align: center;
  }

  .list-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
  .product-img {
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
  .remove-btn {
    position: absolute;
    right: 10px;
    top: 15px;
    cursor: pointer;
  }
  .cart-btn {
    position: absolute;
    right: 10px;
    bottom: 30px;
    cursor: pointer;
  }

  .empty-wishlist {
    height: 600px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    font-size: large;
  }

  @media (max-width: 838px) {
    table {
      width: 100%;
    }
  }
`;

export default Wrapper;
