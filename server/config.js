import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3001;
export const MONGODB_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/iadashboard_db";
