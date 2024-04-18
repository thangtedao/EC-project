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
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .order-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .order-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
  }
  .product-item {
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 0.5rem 0;
    height: 120px;
    display: flex;
    gap: 1rem;
    align-items: center;
    overflow: hidden;
  }
  .product-image {
    text-align: center;
    width: 20%;
    img {
      height: 110px;
    }
  }
  .product-info {
    width: 50%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .product-info-name {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-info-price {
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-price {
    color: #cf0000;
    display: flex;
    gap: 1rem;
    .strike {
      font-size: 0.9rem;
      color: #707070;
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
  }
  .order-status {
    border-radius: 20px;
    background-color: #d1f5ea;
    padding: 0.5rem;
    width: 120px;
    text-align: center;
    font-weight: bold;
    font-size: 0.8rem;
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
