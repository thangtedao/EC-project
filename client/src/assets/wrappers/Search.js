import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  width: 1100px;
  height: 100%;

  .title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #444;
  }
  .filter-buttons {
    display: flex;
    gap: 1rem;
  }
  .filter-button {
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
  .load-btn {
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
    background-color: #fff;
    cursor: pointer;
    :hover {
      background-color: rgba(217, 83, 79, 0.1);
      color: #d70018;
    }
  }
`;

export default Wrapper;
