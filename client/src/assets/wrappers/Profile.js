import styled from "styled-components";

const Wrapper = styled.div`
  width: 1100px;
  text-align: center;
  padding: 1rem 0;

  h5 {
    font-weight: bold;
  }

  .form-info {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    text-align: left;
  }
  .form-image {
    display: grid;
    place-items: center;
    height: 300px;
    width: 35%;
    .avatar {
      height: 250px;
      width: 250px;
      border-radius: 50%;
      border: 1px solid black;
      margin-bottom: 20px;
      overflow: hidden;
      position: relative;
    }
    img {
      max-width: 400px;
      max-height: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    input {
      width: 50%;
    }
  }

  .address-title {
    margin-top: 1.1rem;
    text-align: left;
  }

  .form-info-input {
    width: 65%;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    gap: 1rem;
    margin: 1rem 0;
  }
  .form-info-select {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .btn {
    margin-top: 1rem;
    max-width: 150px;
    height: 2rem;
  }
`;

export default Wrapper;
