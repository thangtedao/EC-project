import styled from "styled-components";

// const Wrapper = styled.section`
//   padding: 3rem;
//   margin-bottom: 5rem;

//   .form-login {
//     width: 30vw;
//     background-color: var(--background-color);
//     border: transparent;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 1rem;
//   }
//   h3 {
//     font-weight: 700;
//     margin-bottom: 2rem;
//   }
//   .form-row {
//     width: 100%;
//   }
//   .form-label {
//     font-size: 1rem;
//     font-weight: 400;
//   }
//   .form-input {
//     font-size: medium;
//     height: 2.5rem;
//     border: transparent;
//     border-bottom: 1px solid lightgray;
//     background-color: var(--background-color);
//   }
//   .btn-block {
//     height: 2.5rem;
//     border: transparent;
//     background-color: #e0052b;
//     text-transform: capitalize;
//     font-size: 1rem;
//     font-weight: 700;
//     color: white;
//     border-radius: 5px;
//   }
//   p {
//     color: #3d3d3d;
//   }

// `;

const Wrapper = styled.div`
  height: fit-content;
  padding: 5rem 0;

  .member-btn {
    margin-left: 0.5rem;
    color: #e0052b;
  }

  .login-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    max-width: 1000px;
    background-color: white;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.16);
    overflow: hidden;
    margin: 0 auto;
    border-radius: 12px;
  }

  .login-box form {
    flex: 1 0 100%;
    max-width: 480px;
    width: 100%;
    padding: 60px;
  }

  /* .login-box form p {
    
  } */

  .login-box form p.form-title {
    color: #333333;
    /* font-family: "Josefin Sans", sans-serif; */
    font-size: 42px;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 30px;
  }

  .login-box form #login-form_username {
    height: 24px;
  }

  .login-box form .ant-btn {
    height: 42px;
    letter-spacing: 1px;
    border-radius: 6px;
  }

  .login-form-button {
    width: 100%;
    background: rgb(224, 5, 43);
    box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
  }

  .illustration-wrapper {
    display: flex;
    align-items: flex-end;
    max-width: 800px;
    min-height: 100%;
    background-color: #fffdf2;
  }

  .illustration-wrapper img {
    display: block;
    width: 100%;
  }
  .login-form-button:hover {
    background-color: rgb(212, 3, 38);
  }

  @media screen and (max-width: 1023px) {
    .login-box {
      flex-direction: column;
      box-shadow: none;
    }
    .illustration-wrapper {
      max-width: 100%;
      min-height: auto;
    }
    .login-box form {
      max-width: 100%;
    }
  }
  .illustration-wrapper {
    background-color: rgb(255 255 255);
  }
  .illustration-wrapper img {
    width: 90%;
  }
`;
export default Wrapper;
