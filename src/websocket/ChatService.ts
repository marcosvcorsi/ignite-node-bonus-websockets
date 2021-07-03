import { container } from "tsyringe";
import { CreateUserService } from "../services/CreateUserService";
import { DisconnectUserService } from "../services/DisconnectUserService";
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

const handleConnect = socket => {
  console.log('connected', socket.id);

  socket.on('start', handleChatStart(socket));
  socket.on('get_users', handleListConnectUsers(socket));
}

const handleDisconnect = async socket => {
  console.log('disconnected', socket.id);

  const disconnectUserService = container.resolve(DisconnectUserService);
  
  await disconnectUserService.execute(socket.id); 
}

io.on('connect', handleConnect);
io.on('disconnect', handleDisconnect);