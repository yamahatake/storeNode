import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  } finally {
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB connection lost. Attempting to reconnect...');
      connectDB();
    });
  }
};