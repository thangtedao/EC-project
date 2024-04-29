import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;

  .dashboard {
    position: absolute;
    left: 255px;
    width: calc(100% - 255px);
    display: flex;
    flex-direction: column;
  }
  .dashboard-page {
    background-color: #ffffff;
    width: 100%;
    padding: 2rem;
  }
`;

export default Wrapper;
