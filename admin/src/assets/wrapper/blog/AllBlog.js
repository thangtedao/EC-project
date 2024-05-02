import styled from "styled-components";

const Wrapper = styled.div`
  width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: left;

  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .input-title {
    font-size: 5rem;
    font-weight: 1000;
  }
  /* .col-1 {
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
  } */
  .list-coupon {
    width: 90%;
    margin: 0 auto;
  }
  .copy-button-container {
    position: absolute;
    top: 50%; /* Đẩy nút lên trên 50% của phần tử cha */
    transform: translateY(-50%); /* Dịch chuyển nút lên trên để căn giữa */
    right: 0;
    margin-right: 10px;
  }
  .main-btn {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn-item {
    flex: 1;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .ant-btn-default {
    width: 100%;
  }
`;

export default Wrapper;
