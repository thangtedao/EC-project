import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 1100px;
  height: 100%;

  .block-top-filter-brands {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .brands-list {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 3px 0;
    img {
      width: 100px;
      height: 40px;
    }
  }
  .nav-link {
    width: 110px;
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
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: red;
  }
  .box-countdown {
  }

  /* ALL PRODUCT */
  .block-filter-sort {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  .block-filter-sort-title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .filter-sort-list-filter {
    display: flex;
    gap: 1rem;
  }
  .btn-filter {
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 8px;
    padding: 0 0.5rem;
    background-color: #ebebeb;
    cursor: pointer;
  }
  .btn-load {
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 8px;
    padding: 0 4rem;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
    background-color: #fff;
    cursor: pointer;
    :hover {
      background-color: rgba(217, 83, 79, 0.1);
      color: #d70018;
    }
  }

  /* BOT */
  .bot-container {
    width: 100%;
    display: flex;
    gap: 1rem;
    border-top: 1px solid lightgray;
    padding-top: 2rem;
    margin-top: 1rem;
  }
  .bot-container-column-1 {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .bot-container-column-2 {
    flex: 1;
  }
  .product-description {
    border: 0.5px solid lightgrey;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* MEDIA QUERIES */
  @media (max-width: 1100px) {
    width: 100%;
  }
  @media (max-width: 750px) {
    /* BOT */
    .bot-container-column-1 {
      flex: none;
      width: 100%;
    }
    .bot-container-column-2 {
      display: none;
    }
  }
`;

export default Wrapper;
