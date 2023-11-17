import React from "react";
import styled from "styled-components";
import { Link, useRouteError } from "react-router-dom";

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }
  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`;

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src="#" alt="not found" />
          <h3>Ohh! Page Not Found</h3>
          <p>we cant seem to find the page you are looking for</p>
          <Link to="/">back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <div>
      <h1>Something went wrong!!!</h1>
    </div>
  );
};

export default Error;
