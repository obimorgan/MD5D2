/** @format */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usersSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
  },
  { timestamps: true }
);

export default model("User", usersSchema);
