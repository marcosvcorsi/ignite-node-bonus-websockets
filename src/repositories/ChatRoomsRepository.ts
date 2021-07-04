import { Types } from 'mongoose';
import { injectable } from "tsyringe";
import { CreateChatRoomDto } from "../dtos/CreateChatRoomDto";
import { ChatRoom, ChatRoomModel } from "../schemas/ChatRoom";

@injectable()
export class ChatRoomsRepository {
  async create({ users }: CreateChatRoomDto): Promise<ChatRoom> {
    const chatRoom = await ChatRoomModel.create({
      users
    });

    return chatRoom;
  }

  async findByUsers(users: string[]): Promise<ChatRoom> {
    const chatRoom = await ChatRoomModel.findOne({
      users: {
        $all: users.map(user => Types.ObjectId(user)),
      },
    });

    return chatRoom;
  }
}