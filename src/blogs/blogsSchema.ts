/** @format */

import mongoose from "mongoose";

interface Icomments {
  comments: string,
  id: number
}

interface IblogsSchema {
  blog_title: string
  description: string
  reading_time: number
  authors: string
  comments: Icomments[]
}

const { Schema, model } = mongoose;

const commentsSchema = new Schema<Icomments>(
  {
    comments: String
  },
  { timestamps: true }
);

const blogsSchema = new Schema <IblogsSchema>(
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
