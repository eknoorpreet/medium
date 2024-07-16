import mongoose from 'mongoose';
import { errorHandler } from '../utils';
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
console.log(DB_USER, DB_PASSWORD, DB_NAME);

export async function connectDB() {
  mongoose
    .connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ynmnh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log('Mongodb connected');
    })
    .catch((err) => errorHandler(err));
}
