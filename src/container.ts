import { container } from "tsyringe";
import { ChatRoomsRepository } from "./repositories/ChatRoomsRepository";
import { MessagesRepository } from "./repositories/MessagesRepository";
import { UsersRepository } from "./repositories/UsersRepository";

container.registerSingleton<UsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<ChatRoomsRepository>("ChatRoomsRepository", ChatRoomsRepository);
container.registerSingleton<MessagesRepository>('MessagesRepository', MessagesRepository);