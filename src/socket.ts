import { Server } from 'socket.io';
import { server } from './http';

const io = new Server(server);

export { io };