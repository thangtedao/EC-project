import React from "react";
import Wrapper from "../assets/wrappers/Error.js";
import { Link, useRouteError } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/logo/LogoNova.svg";

const Error = () => {
  window.scrollTo(0, 0);
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <HelmetProvider>
        <Wrapper>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Error</title>
            <link rel="icon" type="image/svg+xml" href={NovaIcon} />
          </Helmet>

          <div>
            <img src={NovaIcon} alt="not found" />
            <h3>Ohh! Page Not Found</h3>
            <p>we can't seem to find the page you are looking for</p>
            <Link to="/">back home</Link>
          </div>
        </Wrapper>
      </HelmetProvider>
    );
  }

  return (
    <div>
      <h1>Something went wrong!!!</h1>
    </div>
  );
};

export default Error;
