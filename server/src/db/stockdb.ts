import mongoose, { Schema, model } from "mongoose";

const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // avoid duplicate medicine names
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true, // e.g. "antibiotic", "painkiller"
    },
    price: {
      type: Number,
      required: true,
      min: 0, // no negative prices
    },
    stock: {
      type: Number,
      required: true,
      min: 0, // stock can't go below zero
    },
    status: {
      type: String,
      enum: ["in-stock", "low-stock", "out-of-stock"],
      default: "in-stock",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users", // references doctor/chemist who added it
      required: true,
    },
  },
  
);

export const medicineModel = model("medicines", medicineSchema);
