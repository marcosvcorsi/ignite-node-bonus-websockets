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

  async execute({ users }: CreateChatRoomDto): Promise<ChatRoom> {
    const chatRoomAlreadyExists = await this.chatRoomsRepository.findByUsers(users);

    if(chatRoomAlreadyExists) {
      return chatRoomAlreadyExists;
    }

    const chatRoom = await this.chatRoomsRepository.create({ users });

    return chatRoom;
  }
}