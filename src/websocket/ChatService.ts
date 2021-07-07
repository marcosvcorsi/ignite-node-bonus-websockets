import { container } from "tsyringe";
import { CreateChatRoomService } from "../services/CreateChatRoomService";
import { CreateUserService } from "../services/CreateUserService";
import { DisconnectUserService } from "../services/DisconnectUserService";
import { FindChatRoomByIdService } from "../services/FindChatRoomByIdService";
import { FindUserBySocketIdService } from "../services/FindUserBySocketIdService";
import { ListMessagesByChatRoomService } from "../services/ListMessagesByChatRoomService";
import { ListUsersService } from "../services/ListUsersService";
import { SendMessageService } from "../services/SendMessageService";
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

    const findUserBySocketIdService = container.resolve(FindUserBySocketIdService);
    
    const socketUser = await findUserBySocketIdService.execute(socket.id);

    console.log('socketUser', socketUser);

    const createChatRoomService = container.resolve(CreateChatRoomService);

    const chatRoom = await createChatRoomService.execute({
      users: [
        socketUser._id,
        data.idUser
      ]
    });

    console.log('chatRoom', chatRoom);

    socket.join(String(chatRoom._id));

    const listMessagesByChatRoomService = container.resolve(ListMessagesByChatRoomService);
    const messages = await listMessagesByChatRoomService.execute(chatRoom._id);

    console.log('messages', messages);

    callback({ room: chatRoom, messages });
  }
}

const handleSendMessage = (socket) => {
  return async (data) => {
    console.log('HandleSendMessage', data);

    const findUserBySocketIdService = container.resolve(FindUserBySocketIdService);
    const user = await findUserBySocketIdService.execute(socket.id);

    const sendMessageService = container.resolve(SendMessageService);

    const { message: text, idChatRoom: chatRoom } = data;

    const message = await sendMessageService.execute({
      from: user._id,
      text,
      chatRoom
    });

    io.to(chatRoom).emit('message', {
      message,
      user
    });

    const findChatRoomByIdService = container.resolve(FindChatRoomByIdService);
    const room = await findChatRoomByIdService.execute(chatRoom); 

    console.log('room', room);

    const to = room.users.find(item => String(item._id) !== String(user._id));

    console.log('to', to);

    io.to(to.socketId).emit('notification', {
      newMessage: true,
      chatRoom,
      from: user,
    });
  }
}

const handleConnect = socket => {
  console.log('connected', socket.id);

  socket.on('start', handleChatStart(socket));
  socket.on('get_users', handleListConnectUsers(socket));
  socket.on('disconnect', handleDisconnect(socket));
  socket.on('start_chat', handleStartChat(socket));
  socket.on('message', handleSendMessage(socket))
}

io.on('connect', handleConnect);