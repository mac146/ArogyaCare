import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/medicsDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
