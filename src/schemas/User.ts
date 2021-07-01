import mongoose, { Document, Schema } from 'mongoose';

export type User = Document & {
  email: string;
  socketId: string;
  name: string;
  avatar: string;
}

export const UserSchema = new Schema({
  email: String,
  socketId: String,
  name: String,
  avatar: String
});

export const UserModel = mongoose.model<User>("Users", UserSchema);
