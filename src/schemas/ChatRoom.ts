import mongoose, { Document, Schema } from 'mongoose';
import { User } from './User';

export type ChatRoom = Document & {
  users: User[]
}

export const ChatRoomSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ]
});

export const ChatRoomModel = mongoose.model<ChatRoom>("ChatRooms", ChatRoomSchema);