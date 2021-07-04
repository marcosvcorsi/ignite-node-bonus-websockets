import { container } from "tsyringe";
import { ChatRoomsRepository } from "./repositories/ChatRoomsRepository";
import { UsersRepository } from "./repositories/UsersRepository";

container.registerSingleton<UsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<ChatRoomsRepository>("ChatRoomsRepository", ChatRoomsRepository);