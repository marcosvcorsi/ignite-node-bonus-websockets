import { inject, injectable } from "tsyringe";
import { ChatRoomsRepository } from "../repositories/ChatRoomsRepository";
import { ChatRoom } from "../schemas/ChatRoom";

@injectable()
export class FindChatRoomByIdService {
  constructor(
    @inject('ChatRoomsRepository')
    private readonly chatRoomsRepository: ChatRoomsRepository
  ) { }

  async execute(id: string): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomsRepository.findById(id);

    return chatRoom;
  }
}