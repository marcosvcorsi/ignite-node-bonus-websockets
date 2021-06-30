import express from 'express';
import { join } from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(express.static(join(__dirname, '..', 'public')));

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(socket.id);
})

const port = process.env.PORT || 3000;

server.listen(port,  () => console.log(`Server is running on port ${port}`))