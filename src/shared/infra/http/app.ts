import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';

import '@shared/container';
import { AppError } from '@shared/errors/AppError';
// import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import createConnection from '@shared/infra/typeorm';

import { router } from './routes';

createConnection();
const app = express();
app.use(cors());

// app.use(rateLimiter);

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
