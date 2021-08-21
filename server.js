import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import privateRoute from "./routes/private.js";
import errorHandle from "./middleware/error.js";

// connect DB
connectDB();

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/private", privateRoute);
// Errorhandler should be the last middleware
app.use(errorHandle);

const port = process.env.PORT || 9000;

const server = app.listen(port, () => {
  console.log(`Server running on post ${port}`);
});

process.on("unhandleRejection", (err, promise) => {
  console.log(`Logged Error ${err}`);
  server.close(() => process.exit(1));
});
