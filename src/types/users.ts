import {Document, Model,} from "mongoose";
import bcrypt from "bcrypt";

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

export type IuserDoc = Iuser & Document

export interface IuserModel extends Model<Iuser> {
  checkCredentials(email: string, passsword: string): Iuser | null
}