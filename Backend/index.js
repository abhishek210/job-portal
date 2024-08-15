import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
dotenv.config({});
const app = express();

app.use(express.json()); // from frontend when server get the request this middleware parse the request into json formate and we get req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I am coming from backend",
    success: true,
  });
});
const corsOptions = {
  // origin: "http//localhost:5173",
  origin: process.env.ALLOWING_CORS,
  credentials: true,
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);

// "http://localhost:8000/api/v1/user/register" example

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port number :${PORT}`);
});
