import express from "express";
import { login, register } from "./auth.controller.js";
import {
  validateUserLoginSchema,
  validateUserRegisterSchema,
} from "./auth.validator.js";

const router = express.Router();

router.post("/register", validateUserRegisterSchema, register);
router.post("/login", validateUserLoginSchema, login);

export default router;
