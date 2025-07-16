import jwt from "jsonwebtoken";
import ErrorResponse from "../../utils/ErrorResponse.util.js";
import { JWT_SECRET } from "../../config/env.js";
import User from "../../features/users/user.model.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorResponse("Unauthorized", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) throw new ErrorResponse("User no longer exists", 401);

    next();
  } catch (error) {
    next(new ErrorResponse("Invalid token", 401));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorResponse("Forbidden: insufficient permissions", 403)
      );
    }
    next();
  };
};
