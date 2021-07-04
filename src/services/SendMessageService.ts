import { inject, injectable } from "tsyringe";
import { CreateMessageDto } from "../dtos/CreateMessageDto";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { Message } from "../schemas/Message";

@injectable()
export class SendMessageService {
  constructor(
    @inject('MessagesRepository')
    private readonly messagesRepository: MessagesRepository
  ) {}
  
  async execute(data: CreateMessageDto): Promise<Message> {
    const message = await this.messagesRepository.create(data);

    return message;
  }
}