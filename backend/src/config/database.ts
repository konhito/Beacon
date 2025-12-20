import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "idk";
if (!uri) {
  console.log("Database enviroment variable is not initialised");
  process.exit(1);
}

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log("Database successfully connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDb;
