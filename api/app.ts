import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import indexRouter from './routes/index';
import usersRouter from './routes/usersRoutes';
import authRouter from './routes/authRoutes';
import { connectDB } from './utils/db';

const port = process.env.PORT || 5000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors({
  origin: [process.env.APP_BASE_URL],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err: any, req: any, res: any, next: any) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, async () => {
  await connectDB()
});

export default app;
