import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/avira';

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✓ MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

export function closeDatabase() {
  if (isConnected) {
    mongoose.connection.close();
    isConnected = false;
  }
}
