import { injectable } from "tsyringe";
import { CreateMessageDto } from "../dtos/CreateMessageDto";
import { Message, MessageModel } from "../schemas/Message";

@injectable()
export class MessagesRepository {
  async create(data: CreateMessageDto): Promise<Message> {
    const message = await MessageModel.create(data);

    return message;
  }

  async findByChatRoom(chatRoom: string): Promise<Message[]> {
    const messages = await MessageModel
      .find({ chatRoom })
      .populate("from")
      .sort({ createdAt: 1 });

    return messages;
  }
}