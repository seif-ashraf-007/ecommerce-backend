import { MONGODB_URI, PORT } from "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";

try {
  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables");
  }

  await connectDB(MONGODB_URI);

  app.listen(PORT, () => {
    console.log(`✅ [Server] Running on port ${PORT}`);
  });
} catch (error) {
  console.error("❌ [Startup Error] Failed to start the server:");
  console.error(error);

  process.exit(1);
}
