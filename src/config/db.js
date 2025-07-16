import mongoose from "mongoose";

const connectDB = async (MONGODB_URI) => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log(`✅ [DB] Connected to database successfully.`);
  } catch (error) {
    console.log(`❌ [DB] Faild to connect to mongodb: `, error);
    process.exit(1);
  }
};

export default connectDB;
