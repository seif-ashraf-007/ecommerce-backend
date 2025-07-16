import { z } from "zod";

const userRegisterSchema = z.object({
  username: z.string().min(4).max(16),
  email: z.string().email(),
  password: z.string().min(8).max(12),
  role: z.enum(["admin", "user"]).default("user"),
});

const userLoginSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(12),
  })
  .refine((data) => data.email || data.username);

export const validateUserRegisterSchema = async (req, res, next) => {
  try {
    req.body = await userRegisterSchema.parseAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUserLoginSchema = async (req, res, next) => {
  try {
    req.body = await userLoginSchema.parseAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
