import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  width: 1100px;
  height: 100%;

  /* TOP HOME */
  .block-top-home {
    width: 100%;
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
    color: #444;
    font-size: 0.95rem;
    font-weight: 500;
    :hover {
      background-color: lightgray;
    }
  }
  .sliding-banner {
    width: calc(100% - 420px);
    border-radius: 10px;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    margin: 0 0.75rem;
    overflow: hidden;
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

  /* FLASH SALE */
  .block-hot-sale {
    width: 100%;
    border-radius: 10px;
    background-color: #fa4457;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0.75rem;
  }
  .block-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  /* .sale-title {
    font-size: 2rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
  } */

  .baloo-tamma-2-sale-title {
    font-family: "Baloo Tamma 2", system-ui;
    font-optical-sizing: auto;
    font-weight: 800;
    font-style: normal;
    font-size: 2.5rem;
    color: white;
    text-transform: uppercase;
  }

  .tabs {
    display: flex;
    gap: 1rem;
  }
  .tab {
    padding: 10px;
    margin-bottom: 20px;
    border: 2px solid #fff;
    cursor: pointer;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
  }
  .tab:hover {
    background-color: rgba(
      224,
      25,
      25,
      1
    ); /* Adjust the color and transparency as needed */
  }
  .ant-typography {
    font-size: 1.3rem;
  }
  .ant-statistic-content-value {
    font-size: 1.3rem;
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
    color: #444;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  /* Blog */
  .blog-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 0.8rem;
  }
  .blog-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 2px solid #dedede;
    padding: 5px;
    border-radius: 10px;
  }
  .blog-image {
    width: 100%;
    img {
      max-width: 100%;
      max-height: 150px;
    }
  }
  .blog-title {
    max-width: 100%;
    line-height: 1.5;
    font-weight: 700;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    max-height: 3.6em;
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
