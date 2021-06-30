import { Server } from 'socket.io';
import { server } from './http';

const io = new Server(server);

io.on('connection', (socket) => {
  console.log(socket.id);
})

export { io };