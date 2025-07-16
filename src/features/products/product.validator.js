import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(2).max(32),
  description: z.string().min(4).max(128),
  category: z.string().min(2).max(12),
  price: z.preprocess((val) => parseFloat(val), z.number().positive()),
  images: z.array(z.string()).min(1).max(4).optional(),
});

export const validateProduct = async (req, res, next) => {
  try {
    req.body = await productSchema.parseAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
