import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middleware/error-handler';

dotenv.config();

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(cors());
server.use(express.json());

// ERROR HANDLING
server.use(errorHandler);

// HEALTHCHECK
server.use('/api/healthcheck', (req, res) =>
  res.send({ success: true, data: 'The server is up and running' })
);

export default server;