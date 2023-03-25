import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(cors());

export default app;
