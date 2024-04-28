import styled from "styled-components";

const Wrapper = styled.div`
  width: 1100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;

  .top-product-title {
    width: 100%;
    font-size: 1.3rem;
    font-weight: 700;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
  }

  /* TOP */
  .top-container {
    width: 100%;
    display: flex;
    gap: 1.5rem;
  }
  .top-container-column-1 {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .top-container-column-2 {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .model {
    width: 150px;
    height: 50px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .active {
    border: 1px solid #f52f32;
  }
  .model-info {
    display: flex;
    gap: 5px;
  }

  .sliding-product-image {
    width: 100%;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
    margin-right: 1rem;
    border-radius: 10px;
    overflow: hidden;
  }
  .product-img {
    height: 350px;
  }

  .box-product-variants {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .box-product-price {
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.3rem;
    font-weight: bold;
    color: #fd2424;
    .strike {
      font-size: 1rem;
      color: #707070;
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
  }
  .btn-buy {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
  }
  .btn-buynow {
    width: 90%;
    border-radius: 10px;
    border: none;
    background: linear-gradient(#f52f32, #e11b1e);
    font-weight: 700;
    font-size: 1.1rem;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
  }
  .btn-addtocart {
    border-color: #e04040;
    color: #e04040;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 0.2rem;
    cursor: pointer;
    p {
      font-size: 0.6rem;
    }
  }

  /* MID */
  .mid-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 2rem;
    margin-top: 1rem;
    border-top: 1px solid lightgray;
    .mid-title {
      font-size: 1.3rem;
      font-weight: bold;
      color: #444;
    }
  }

  /* BOT */
  .bot-container {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 1rem;
    border-top: 1px solid lightgray;
    padding-top: 2rem;
    margin-top: 1rem;
  }
  .bot-container-column-1 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .bot-container-column-2 {
    font-size: 0.95rem;
  }

  /* MEDIA QUERIES */
  @media (max-width: 1100px) {
    width: 100%;
  }
  @media (max-width: 950px) {
    /* TOP */
    .top-container-column-1 {
      width: 40%;
    }
    .top-container-column-2 {
      width: 60%;
    }
  }
  @media (max-width: 750px) {
    /* TOP */
    .top-container {
      flex-direction: column;
      gap: 1rem;
    }
    .top-container-column-1 {
      width: 100%;
    }
    .top-container-column-2 {
      width: 100%;
    }

    /* BOT */
    .bot-container {
      grid-template-columns: 1fr;
    }
    .bot-container-column-2 {
      display: none;
    }
  }

  #blog {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
    background-color: #fff;
    text-align: left;
    border: 0.5px solid lightgrey;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  .blog-content {
    position: relative;
    height: 500px;
    overflow: hidden;
  }
  .blog-content p {
    text-align: justify;
    font-size: 15px;
    line-height: 1.5;

    font-weight: 500;
    color: #444;
    margin-bottom: 10px;
  }
  .blog-content h2 {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0.3rem;
  }
  .blog-content h3 {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 1rem 0 0.5rem 0;
  }
  .blog-content img {
    width: 100%;
  }
  .blog-showmore {
    padding-top: 50px;
    text-align: center;
    font-weight: 500;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    cursor: pointer;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.91) 50%,
      #fff 55%
    );

    :hover {
      color: #fd2424;
    }
  }
  .ant-radio-group .ant-radio-button-wrapper + .ant-radio-button-wrapper {
    margin-left: 10px; /* Khoảng cách giữa các mục */
  }
  .ant-radio-button-wrapper {
    line-height: 15px; //chiều cao của button
  }
  .ant-radio-button-wrapper:not(:first-child)::before {
    content: none; //Bỏ cái viền xanh xanh
  }
`;

export default Wrapper;
