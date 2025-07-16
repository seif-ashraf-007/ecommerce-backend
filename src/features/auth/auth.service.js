import { generateToken } from "../../utils/auth/generateToken.js";
import ErrorResponse from "../../utils/ErrorResponse.util.js";
import User from "../users/user.model.js";

export const register = async ({ username, email, password, role }) => {
  // check user existance with email or username
  const existingUserWithEmail = await User.findOne({ email });
  const existingUserWithUsername = await User.findOne({ username });

  if (existingUserWithEmail)
    throw new ErrorResponse("User already exists with this email", 400);

  if (existingUserWithUsername) {
    throw new ErrorResponse("User already exists with this username", 400);
  }

  // user doesn't exist, then create a new user (password will be hashed in the model)
  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  if (!user) throw new ErrorResponse("Failed to register", 400);

  const token = generateToken(user._id, user.role);

  if (!token) throw new ErrorResponse("Failed to create a token", 400);
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

export const login = async ({ email, username, password }) => {
  const user = await User.findOne({
    $or: [{ email }, { username }],
  }).select("+password");

  if (!user) throw new ErrorResponse("Invalid username/email or password", 401);

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    throw new ErrorResponse("Invalid username/email or password", 401);

  const token = generateToken(user._id, user.role);

  if (!token) throw new ErrorResponse("Faild to generate a token", 400);

  return {
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  };
};
