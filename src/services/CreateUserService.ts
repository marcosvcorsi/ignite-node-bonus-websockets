import { inject, injectable } from 'tsyringe';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UsersRepository } from '../repositories/UsersRepository';
import { User } from '../schemas/User';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({ email, socketId, name, avatar }: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) {
      return this.usersRepository.update(userAlreadyExists._id, {
        name,
        socketId,
        avatar
      });
    }

    return this.usersRepository.create({
      email,
      socketId,
      name,
      avatar
    })
  }
}