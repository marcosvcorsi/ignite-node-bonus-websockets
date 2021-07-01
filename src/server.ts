import { server } from "./http";
import dotenv from 'dotenv';

dotenv.config();

import './database';
import './socket';
import './websocket/ChatService';

const port = process.env.PORT || 3000;

server.listen(port,  () => console.log(`Server is running on port ${port}`))