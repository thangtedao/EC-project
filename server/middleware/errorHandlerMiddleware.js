import HttpStatus from "http-status-codes";
const { StatusCodes } = HttpStatus;

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong, try again later!!!";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
