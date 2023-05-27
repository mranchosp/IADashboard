import { connect } from "mongoose";
import { MONGODB_URI } from "./config";

export const connectDB = async () => {
  try {
    await connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error(error);
  }
};
