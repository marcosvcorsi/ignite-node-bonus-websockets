import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";

@injectable()
export class DisconnectUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ){}

  async execute(socketId: string): Promise<void> {
    const user = await this.usersRepository.findBySocketId(socketId);

    if (user) {
      const { name, avatar } = user;

      await this.usersRepository.update(user._id, {
        name,
        avatar,
        socketId: null,
      });
    }    
  }
}