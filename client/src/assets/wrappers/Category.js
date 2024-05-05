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
    gap: 1.5rem;
    width: 100%;
  }
  .filter-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .filter-title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .filter-select {
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0;
  }
  select {
    border-radius: 5px;
    padding: 8px 5px;
    font-size: 0.9rem;
  }

  .slider {
    display: flex;
    align-items: center;
    gap: 2rem;
    width: 70%;
    min-width: 500px;
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }
  .btn {
    padding: 10px 20px;
  }

  .btn-filter {
    font-size: 0.9rem;
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
    display: grid;
    grid-template-columns: 3fr 1fr;
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
`;

export default Wrapper;
