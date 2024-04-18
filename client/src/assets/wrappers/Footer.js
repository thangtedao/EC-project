import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 170px;
  position: relative;
  display: flex;
  justify-content: center;
  border-top: 1px solid lightgray;
  padding-top: 1rem;
  margin-bottom: 26px;

  .footer-container {
    width: 1100px;
    display: flex;
    justify-content: space-between;
  }
  .footer-items {
    display: flex;
    flex-direction: column;
  }
  .footer-items-title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .footer-items-content {
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

export default Wrapper;
