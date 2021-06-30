import { io } from "../socket";

io.on('connect', socket => {
  socket.emit('chat_created', {
    message: 'chat created successfuly'
  })
})