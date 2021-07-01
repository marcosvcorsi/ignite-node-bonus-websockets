import mongoose, { Document, Schema } from 'mongoose';

export type Message = Document & {
  to: string;
  text: string;
  createdAt: string;
  roomId: string;
}

export const MessageSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "ChatRooms"
  },
});

export const MessageModel = mongoose.model<Message>("Messages", MessageSchema);
