import { z } from "zod";

const userSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(12),
  role: z.enum(["admin", "user"]).default("user"),
});

export const validateUser = async (req, res, next) => {
  try {
    req.body = await userSchema.parseAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
