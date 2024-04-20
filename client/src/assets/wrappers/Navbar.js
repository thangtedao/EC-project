import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #d70018;
  z-index: 99;
  height: 3.8rem;

  .nav-center {
    display: flex;
    width: 1100px;
    align-items: center;
    justify-content: space-between;
  }

  .nav-links {
    display: flex;
    gap: 1.2rem;
  }
  .nav-link {
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  .icon {
    font-size: 1.6rem;
  }

  /* @media (min-width: 992px) {
    position: sticky;
    top: 0;
  } */
`;

export default Wrapper;
