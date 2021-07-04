import mongoose, { Document, Schema } from 'mongoose';

export type Message = Document & {
  from: string;
  text: string;
  createdAt: string;
  chatRoom: string;
}

export const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: "ChatRooms"
  },
});

export const MessageModel = mongoose.model<Message>("Messages", MessageSchema);
