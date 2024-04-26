import React from "react";
import Wrapper from "../assets/wrapper/error/Error";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
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
