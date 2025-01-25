require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
connectDB();
app.use("/api/auth", userRouter);
app.listen(process.env.PORT, () => console.log("Server is running"));
