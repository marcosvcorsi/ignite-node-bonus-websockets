import express from 'express';
import { join } from 'path';
import { createServer } from 'http';

const app = express();

app.use(express.static(join(__dirname, '..', 'public')));

const server = createServer(app);

export { server };