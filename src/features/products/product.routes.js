import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
import { validateProduct } from "./product.validator.js";
import { upload } from "../../config/multer.config.js";
import {
  authorize,
  protect,
} from "../../shared/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  protect,
  authorize(["admin"]),
  upload.array("images", 4),
  validateProduct,
  createProduct
);

router.patch(
  "/:id",
  protect,
  authorize(["admin"]),
  upload.array("images", 4),
  validateProduct,
  updateProduct
);

router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;
