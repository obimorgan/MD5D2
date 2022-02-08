/** @format */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogsSchema = new Schema(
  {
    blog_title: { type: String, required: true },
    reading_time: Number,
  },
  { timestamps: true }
);

export default model("Blogs", blogsSchema);
