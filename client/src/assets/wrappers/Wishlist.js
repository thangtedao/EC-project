import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem;
  text-align: center;
  height: fit-content;

  .title {
    width: 100%;
    font-size: large;
    font-weight: bold;
    text-align: center;
  }

  table {
    width: 800px;
    font-size: 1rem;
    margin-top: 2rem;
  }
  th {
    height: 30px;
    border-bottom: 1px solid lightgray;
  }
  td {
    height: 80px;
    border-bottom: 1px solid lightgray;
  }
  th,
  td {
    text-align: left;
    padding: 1rem;
  }
  td:first-child {
    width: 50%;
  }

  .product-card {
    display: flex;
    gap: 1rem;
    height: 100px;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0;
    margin-left: 0.5rem;
    .product-name {
      font-size: 1.1rem;
      font-weight: bold;
    }
  }
  .product-price {
    font-size: 1.1rem;
    color: #d70018;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    font-weight: bold;
  }
  .strike {
    font-size: 0.9rem;
    color: #707070;
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
  .image {
    width: 120px;
    height: 100px;
    img {
      max-width: 300px;
      height: inherit;
    }
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
