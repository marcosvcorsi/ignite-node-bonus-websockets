import { inject, injectable } from "tsyringe";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { Message } from "../schemas/Message";

@injectable()
export class ListMessagesByChatRoomService {
  constructor(
    @inject('MessagesRepository')
    private readonly messagesRepository: MessagesRepository
  ) { }

  async execute(chatRoom: string): Promise<Message[]> {
    const messages = await this.messagesRepository.findByChatRoom(chatRoom);

    return messages;
  }
}