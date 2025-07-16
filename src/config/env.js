// env.js
import dotenv from "dotenv";
dotenv.config({
  quiet: true,
});

export const { PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
