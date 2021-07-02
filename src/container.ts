import { container } from "tsyringe";
import { UsersRepository } from "./repositories/UsersRepository";

container.registerSingleton<UsersRepository>("UsersRepository", UsersRepository);