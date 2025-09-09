import mongoose, { model,Schema } from "mongoose";

const medicSchema = new Schema({
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["doctor", "chemist"], // only allow these roles
    required: true 
  }
});

export const medicModel = model("medics", medicSchema);


