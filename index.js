import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

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

app.listen(process.env.PORT || 8000, () => {
  connect();

  console.log("running on port 8000");
});
