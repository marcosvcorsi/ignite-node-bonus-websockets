import { injectable } from 'tsyringe';
import { CreateUserDto } from "../dtos/CreateUserDto";
import { User, UserModel } from "../schemas/User";

@injectable()
export class UsersRepository {
  async create(data: CreateUserDto): Promise<User> {
    const user = await UserModel.create(data);

    return user;
  }

  async update(id: string, { 
    name, 
    socketId, 
    avatar 
  }: Pick<
    CreateUserDto, 
    'name' | 
    'socketId' | 
    'avatar'>
  ): Promise<User> {
    const user = await UserModel.findOneAndUpdate({
      _id: id,
    }, {
      $set: {
        name,
        socketId,
        avatar
      }
    }, {
      new: true,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await UserModel.findOne({
      email
    })

    return user;
  }

  async findBySocketId(socketId: string): Promise<User> {
    const user = await UserModel.findOne({
      socketId
    })

    return user;
  }

  async findConnectedUsers(socketId: string): Promise<User[]> {
    const users = await UserModel.find({
      socketId: {
        $ne: socketId,
        $exists: true,
      }
    }).exec();

    return users;
  }
}