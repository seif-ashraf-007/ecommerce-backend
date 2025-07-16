import express from "express";
import productRoutes from "../features/products/product.routes.js";
import authRoutes from "../features/auth/auth.routes.js";
import userRouter from "../features/users/user.routes.js";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRouter);

export default router;
