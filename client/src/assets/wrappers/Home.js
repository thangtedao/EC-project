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

  /* TOP HOME */
  .block-top-home {
    width: 100%;
    //height: 350px;
    display: flex;
    justify-content: space-between;
  }
  .menu-container {
    border: 1px solid lightgray;
    width: 200px;
    border-radius: 5px;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.3rem 0.2rem;
    border-radius: 5px;
    color: #4a4a4a;
    font-weight: 700;
    :hover {
      background-color: lightgray;
    }
  }
  .right-banner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 240px;
    img {
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
        0 2px 6px 2px rgba(60, 64, 67, 0.15);
      border-radius: 5px;
    }
  }
  .sliding-banner {
    width: calc(100% - 420px);
    border-radius: 10px;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    margin: 0 0.75rem;
    overflow: hidden;
  }

  /* FLASH SALE */
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
    font-size: 2rem;
    font-weight: 700;
    color: red;
  }
  .box-countdown {
    color: white;
  }

  /* PRODUCTS SALE  */
  .product-by-category {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    width: 100%;
  }
  .product-by-category-title {
    color: black;
    font-size: 2rem;
    font-weight: bold;
  }

  /* MEDIA QUERIES */
  @media (max-width: 1100px) {
    width: 100%;
  }
  @media (max-width: 960px) {
    .sliding-banner {
      width: calc(100% - 220px);
    }
    .right-banner {
      display: none;
    }
  }
  @media (max-width: 800px) {
  }
  @media (max-width: 700px) {
    .menu-container {
      width: 150px;
    }
    .sliding-banner {
      width: calc(100% - 170px);
    }
  }
  @media (max-width: 550px) {
    .sliding-banner {
      width: 95%;
    }
    .menu-container {
      display: none;
    }
  }
`;

export default Wrapper;
