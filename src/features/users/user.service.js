import ErrorResponse from "../../utils/ErrorResponse.util.js";
import User from "./user.model.js";

export const getAllUsers = async () => {
  const users = await User.find();

  if (!users) throw new ErrorResponse("Users not found", 404);

  return users;
};

export const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) throw new ErrorResponse("User not found", 404);

  return user;
};

export const createUser = async ({ username, email, password, role }) => {
  const existingUserWithEmail = await User.findOne({ email });
  const existingUserWithUsername = await User.findOne({ username });

  if (existingUserWithEmail)
    throw new ErrorResponse("User already exists with this email", 400);

  if (existingUserWithUsername) {
    throw new ErrorResponse("User already exists with this username", 400);
  }

  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  if (!user) throw new ErrorResponse("Failed to create new user", 400);

  return user;
};

export const updateUserById = async (id, updates) => {
  const { username, email, password, role } = updates;

  const user = await User.findById(id);
  if (!user) throw new ErrorResponse("Couldn't find user", 404);

  // Check for existing email or username conflict
  const existingUserWithEmail = await User.findOne({ email });
  if (existingUserWithEmail && existingUserWithEmail._id.toString() !== id) {
    throw new ErrorResponse("User already exists with this email", 400);
  }

  const existingUserWithUsername = await User.findOne({ username });
  if (
    existingUserWithUsername &&
    existingUserWithUsername._id.toString() !== id
  ) {
    throw new ErrorResponse("User already exists with this username", 400);
  }

  // Check if all fields are unchanged
  const isSameUsername = username === user.username;
  const isSameEmail = email === user.email;
  const isSameRole = role === user.role;

  // Compare password if provided
  const isSamePassword = password ? await user.comparePassword(password) : true;

  if (isSameUsername && isSameEmail && isSamePassword && isSameRole) {
    throw new ErrorResponse("No changes detected", 400);
  }

  // Update fields
  if (!isSameUsername) user.username = username;
  if (!isSameEmail) user.email = email;
  if (!isSameRole) user.role = role;
  if (!isSamePassword && password) user.password = password;

  const updatedUser = await user.save();
  return updatedUser;
};

export const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) throw new ErrorResponse("Error while deleting user.", 400);

  return deletedUser;
};
