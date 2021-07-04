import { inject, injectable } from "tsyringe";
import { CreateChatRoomDto } from "../dtos/CreateChatRoomDto";
import { ChatRoomsRepository } from "../repositories/ChatRoomsRepository";
import { ChatRoom } from "../schemas/ChatRoom";

@injectable()
export class CreateChatRoomService {
  constructor(
    @inject('ChatRoomsRepository')
    private readonly chatRoomsRepository: ChatRoomsRepository
  ) {}

  async execute(data: CreateChatRoomDto): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomsRepository.create(data);

    return chatRoom;
  }
}