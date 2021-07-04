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
}