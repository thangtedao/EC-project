import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
  }
  .col-1 {
    width: 60%;
    height: fit-content;
  }
  .col-2 {
    width: 40%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .btn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    background-color: #f3f3f3;
    padding: 1 rem;
    height: 60px;
    width: 350px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .discount {
    display: flex;
    gap: 10px;
  }
  .discount-item-1 {
    flex-grow: 5;
    box-sizing: border-box;
  }
  .discount-item-2 {
    flex-grow: 2;
    box-sizing: border-box;
  }
  .discount-item-3 {
    flex-grow: 3;
    box-sizing: border-box;
  }
  .customer {
    display: flex;
    gap: 10px;
  }
  .customer-item-1 {
    box-sizing: border-box;
  }
  .customer-item-2 {
    box-sizing: border-box;
  }
`;

export default Wrapper;
