class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ErrorResponse";
  }
}

export default ErrorResponse;
