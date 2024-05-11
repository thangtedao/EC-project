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
    width: 50%;
    height: fit-content;
  }
  .col-2 {
    width: 50%;
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
  .col-3 {
    width: 65%;
    height: fit-content;
  }
  .col-4 {
    width: 35%;
    height: fit-content;
  }
  .col-3-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-4-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .revenue {
    width: "100%";
    margin-bottom: 20px;
  }
  .revenue-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .ant-card-body {
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 5px;
  }
  .ant-spin-container {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export default Wrapper;
