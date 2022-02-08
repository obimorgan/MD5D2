/** @format */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentsSchema = new Schema(
  {
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const blogsSchema = new Schema(
  {
    blog_title: { type: String, required: true },
    description: String,
    reading_time: Number,
    authors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    comments: [commentsSchema],
  },
  { timestamps: true }
);

export default model("Blogs", blogsSchema);
