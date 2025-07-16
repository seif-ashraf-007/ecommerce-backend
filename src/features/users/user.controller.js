import ErrorResponse from "../../utils/ErrorResponse.util.js";
import * as userService from "../users/user.service.js";
import { isValidMongoId } from "../../utils/validation.util.js";

export const getProfile = (req, res, next) => {
  try {
    const { user } = req;

    if (!user) throw new ErrorResponse("User not found", 404);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !isValidMongoId(id)) {
      throw new ErrorResponse("Invalid user ID.", 400);
    }
    const user = await userService.getUserById(id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !isValidMongoId(id)) {
      throw new ErrorResponse("Invalid user ID.", 400);
    }

    const user = await userService.updateUserById(id, req.body);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !isValidMongoId(id)) {
      throw new ErrorResponse("Invalid user ID.", 400);
    }

    const deletedUser = await userService.deleteUser(id);

    res.status(200).json({
      success: true,
      deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
