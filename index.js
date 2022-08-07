import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./Routes/usersRoute.js";
import videoRoute from "./Routes/videosRoute.js";
import commentsRoute from "./Routes/commentsRoute.js";
import authRoute from "./Routes/authRoute.js";

const app = express();
dotenv.config();

const url = process.env.MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Wnet Wrong";
  return (
    res.
    status(status).json({
      success: false,
      status: status,
      message: message,
    })
  );
});

app.listen(process.env.PORT || 8000, () => {
  connect();

  console.log("running on port 8000");
});
