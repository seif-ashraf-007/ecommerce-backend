import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getProfile,
  getUserById,
  updateUser,
} from "./user.controller.js";
import {
  authorize,
  protect,
} from "../../shared/middlewares/auth.middleware.js";
import { validateUser } from "./user.validator.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getAllUsers);

router.get("/me", protect, getProfile);

router.get("/:id", protect, authorize("admin"), getUserById);

router.post("/", protect, authorize("admin"), validateUser, createUser);

router.patch("/:id", protect, authorize("admin"), validateUser, updateUser);

router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
