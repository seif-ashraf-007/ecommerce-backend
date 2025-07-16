import ErrorResponse from "../../utils/ErrorResponse.util.js";
import * as authService from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    // pass the request body to the register service and extract token and user from the service return
    const { token, user } = await authService.register(req.body);

    if (!token || !user)
      throw new ErrorResponse("Error while registering", 400);

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token, user } = await authService.login(req.body);

    if (!token || !user) throw new ErrorResponse("Error while loggin in", 400);

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
