/** @format */

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

export interface Iuser {
  first_name: string
  last_name: string
  email: string
  password: string
  role: string
  blogs: string
  createdAt: Date
  updatedAt: Date
}

const usersSchema = new Schema<Iuser>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blogs" }],
  },
  { timestamps: true }
);

//Hashing functon -- returns a "hashed" values before its saved to the db
// "this " grabs the usersSchema
usersSchema.pre("save", async function (next) {
  const newUser = this;
  const plainPW = newUser.password;

  if (newUser.isModified("password")) {
    const hash = await bcrypt.hash(plainPW, 10);
    newUser.password = hash;
  }

  next();
});

//Projection to not display the password property
usersSchema.methods.toJSON = function () {
  // this function will be called automagically EVERY TIME express does a res.send(users)

  const userDocument = this;
  const userObject = userDocument.toObject();
  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

usersSchema.statics.checkCredentials = async function (email, plainPW) {
  // 1. find the user by email
  const user = await this.findOne({ email }); // "this" here refers to UserModel

  if (user) {
    // 2. if the user is found --> compare plainPw with the hashed one
    const isMatch = await bcrypt.compare(plainPW, user.password);
    if (isMatch) {
      // 3. If they do match --> return a proper response
      return user;
    } else {
      // 4. If they don't --> return null
      return null;
    }
  } else {
    // 5. also if email is not ok --> return null
    return null;
  }
};

export default model("User", usersSchema);
