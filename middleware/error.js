import ErrorResponse from "../utils/errorResponse.js";

const errorHandle = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  console.log(err);

  if (err.code === 11000) {
    const message = `Duplicate Field Falue Enter.`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "validationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    sucess: false,
    error: error.message || "Server Error.",
  });
};

export default errorHandle;
