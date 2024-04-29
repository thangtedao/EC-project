import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;

  // TOP
  .product-review-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 0;
    box-shadow: 0 0 10px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
    gap: 1rem;
    padding: 1rem;

    .review-title {
      font-size: 1rem;
      font-weight: bold;
      color: #4a4a4a;
    }
  }
  .box-review {
    width: 100%;
    display: flex;
    font-size: 1rem;
  }
  .box-review-score {
    width: 40%;
    border-right: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  .box-review-star {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    font-size: 0.95rem;
  }
  .rating-level {
    padding: 0.4rem;
    gap: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .gold {
      color: #ffbf00;
    }
    .star-number {
      font-weight: 700;
    }
  }

  // MID
  .btn-review-container {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    width: 100%;
    display: grid;
    place-items: center;
    padding: 1.3rem;
    gap: 1rem;
  }
  .btn-review {
    padding: 0.6rem 1.5rem;
    display: grid;
    place-items: center;
    background: #d7000e;
    color: white;
    font-size: 1.05rem;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
  }
  .form-rating {
    width: 100%;
    display: grid;
    gap: 1rem;

    textarea {
      width: 90%;
      min-height: 8em;
      max-height: 40em;
      padding: 0.7rem;
      font-size: 0.9rem;
      resize: vertical;
      border-radius: 10px;
      border: 0;
      box-shadow: 0 0 10px 0 rgba(60, 64, 67, 0.1),
        0 2px 6px 2px rgba(60, 64, 67, 0.15);
    }
    .btn {
      width: 10%;
      height: 35px;
      background: #d7000e;
    }
  }

  // BOT
  .box-review-comment {
  }
  .box-review-comment-item {
    margin-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
  }
  .box-review-comment-item-title {
    display: flex;
    align-items: center;
    padding: 0.3rem;
    gap: 0.5rem;
  }
  .box-review-comment-item-content {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding-left: calc(29px + 0.9rem);
  }
  .avatar {
    width: 29px;
    height: 29px;
  }
  .name {
    text-transform: capitalize;
    font-weight: 500;
    font-size: 1rem;
  }
  .time {
    margin-left: 0.3rem;
    font-size: 0.85rem;
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .content {
    font-size: 0.9rem;
  }

  .form-reply {
    width: 100%;
    display: grid;
    gap: 1rem;
    margin-top: 0.8rem;
    padding-left: calc(29px + 0.9rem);

    textarea {
      width: 90%;
      min-height: 5em;
      max-height: 30em;
      padding: 0.7rem;
      font-size: 0.9rem;
      resize: vertical;
      border-radius: 10px;
      border: 0;
      box-shadow: 0 0 10px 0 rgba(60, 64, 67, 0.1),
        0 2px 6px 2px rgba(60, 64, 67, 0.15);
    }
    .btn {
      width: 10%;
      height: 35px;
      background: #d7000e;
    }
  }
`;

export default Wrapper;
