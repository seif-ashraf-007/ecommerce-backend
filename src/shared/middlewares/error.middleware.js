// error.middleware.js
import { ZodError } from "zod";

const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Log raw error

  if (err.name === "ErrorResponse") {
    return res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || "Server Error",
    });
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Mongoose: Invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 404;
    message = `Resource not found. Invalid: ${err.path}`;
  }

  // Mongoose: Duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate field value entered`;
  }

  // Mongoose: Validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired. Please log in again.";
  }

  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized access.";
  }

  if (err.name === "SyntaxError") {
    statusCode = 400;
    message = "Syntax error.";
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorMiddleware;
