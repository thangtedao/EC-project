import styled from "styled-components";

const Wrapper = styled.section`
  padding: 3rem;
  margin-bottom: 5rem;

  .form-login {
    width: 30vw;
    background-color: var(--background-color);
    border: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  h3 {
    font-weight: 700;
    margin-bottom: 2rem;
  }
  .form-row {
    width: 100%;
  }
  .form-label {
    font-size: 1rem;
    font-weight: 400;
  }
  .form-input {
    font-size: medium;
    height: 2.5rem;
    border: transparent;
    border-bottom: 1px solid lightgray;
    background-color: var(--background-color);
  }
  .btn-block {
    height: 2.5rem;
    border: transparent;
    background-color: #e0052b;
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: 700;
    color: white;
    border-radius: 5px;
  }
  p {
    color: #3d3d3d;
  }
  .member-btn {
    margin-left: 0.5rem;
    color: #e0052b;
  }
`;

export default Wrapper;
