import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../schemas/User";

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(socketId: string): Promise<User[]> {
    const users = await this.usersRepository.findConnectedUsers(socketId);

    return users;
  }
}