import { container } from "tsyringe";
import { CreateChatRoomService } from "../services/CreateChatRoomService";
import { CreateUserService } from "../services/CreateUserService";
import { DisconnectUserService } from "../services/DisconnectUserService";
import { FindUserBySocketId } from "../services/FindUserBySocketId";
import { ListUsersService } from "../services/ListUsersService";
import { io } from "../socket";

const handleChatStart = socket => {
  return async data => {
    console.log('HandleStart received', data);
    
    const { id: socketId } = socket;
    const { email, avatar, name } = data;
  
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      socketId,
      avatar,
      name
    });

    console.log('Broadcast user', user);

    socket.broadcast.emit('new_users', user);
  }
}

const handleListConnectUsers = socket => {
  return async (callback) => {
    console.log('HandleListConnectUsers');

    const { id: socketId } = socket;
    
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute(socketId);

    console.log('users', users);

    return callback(users);
  }
}


const handleDisconnect = socket => {
  return async () => {
    console.log('disconnected', socket.id);

    const disconnectUserService = container.resolve(DisconnectUserService);
    
    await disconnectUserService.execute(socket.id); 
  }
}

const handleStartChat = socket => {
  return async (data, callback) => {
    console.log('HandleStartChat', data);    

    const findUserBySocketId = container.resolve(FindUserBySocketId);
    
    const socketUser = await findUserBySocketId.execute(socket.id);

    console.log('socketUser', socketUser);

    const createChatRoomService = container.resolve(CreateChatRoomService);

    const chatRoom = await createChatRoomService.execute({
      users: [
        socketUser._id,
        data.idUser
      ]
    });

    console.log('chatRoom', chatRoom);

    callback(chatRoom);
  }
}

const handleConnect = socket => {
  console.log('connected', socket.id);

  socket.on('start', handleChatStart(socket));
  socket.on('get_users', handleListConnectUsers(socket));
  socket.on('disconnect', handleDisconnect(socket));
  socket.on('start_chat', handleStartChat(socket));
}

io.on('connect', handleConnect);