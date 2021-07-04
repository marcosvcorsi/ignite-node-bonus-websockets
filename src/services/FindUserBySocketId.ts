import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../schemas/User";

@injectable()
export class FindUserBySocketId {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(socketId: string): Promise<User> {
    const user = await this.usersRepository.findBySocketId(socketId);

    return user;
  }
}