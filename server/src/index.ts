import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middleware/error-handler';
import connectDatabase from './database/connection';
import locationsRouter from './routes/Location.routes';
import { ErrorRequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const server = express();

// DATABASE
connectDatabase();

// MIDDLEWARE
server.use(helmet());
server.use(cors());
server.use(express.json());

// HEALTHCHECK
server.use('/api/healthcheck', (req, res) =>
  res.send({ success: true, data: 'The server is up and running' })
);

// ROUTES
server.use('/api/locations', locationsRouter);

// ERROR HANDLING
server.use(errorHandler);

export default server;
