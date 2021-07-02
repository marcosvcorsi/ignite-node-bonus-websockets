import { Server } from 'socket.io';
import { container } from 'tsyringe';
import { server } from './http';
import { CreateUserService } from './services/CreateUserService';

const io = new Server(server);

const handleStart = (socketId: string) => {
  return async data => {
    console.log('HandleStart received', socketId, data);
    
    const { email, avatar, name } = data;
  
    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({
      email,
      socketId,
      avatar,
      name
    });
  }
}

io.on('connection', (socket) => {
  console.log('Connected: ', socket.id);

  socket.on('start', handleStart(socket.id));
})

export { io };