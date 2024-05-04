import styled from "styled-components";

const Wrapper = styled.div`
  width: 650px;
  height: 100%;
  padding-bottom: 1rem;
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

  .form-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    p {
      text-transform: uppercase;
    }
  }
  .form-info-input {
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 1.5rem 1rem 1.5rem 1rem;
    gap: 1.5rem;
  }

  .coupon-field {
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: 1rem;
    background: white;

    .btn-apply {
      border-radius: 8px;
      border: none;
      background: #d70018;
      font-weight: 700;
      color: white;
      cursor: pointer;
    }
  }
  .coupon-card {
    border: 1px solid lightgray;
    padding: 10px 1rem;
    display: flex;
    gap: 1rem;
  }
  .coupon-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .price {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 1rem 0;
  }
  .price-item {
    display: flex;
    justify-content: space-between;
  }

  .vnpay-btn {
    width: 100%;
    border: 1px solid rgba(145, 158, 171, 0.239);
    border-radius: 5px;
    background-color: white;
    display: grid;
    place-items: center;
    height: 40px;
    cursor: pointer;

    img {
      height: 31px;
      cursor: pointer;
    }
  }
`;

export default Wrapper;
