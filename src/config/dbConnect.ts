import mongoose from "mongoose";

declare global {
  var isMongoConnected: boolean;
}

global.isMongoConnected = false;

async function dbConnect() {
  if (global.isMongoConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.DB_URI as string);
    global.isMongoConnected = true;
  } catch (err) {
    throw err;
  }
}

export default dbConnect;
