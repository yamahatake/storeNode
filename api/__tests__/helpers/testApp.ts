import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import authRouter from '../../routes/authRoutes';
import usersRouter from '../../routes/usersRoutes';

export function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use('/auth', authRouter);
  app.use('/users', usersRouter);
  return app;
}
