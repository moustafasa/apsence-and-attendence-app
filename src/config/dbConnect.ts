import mongoose from "mongoose";

declare global {
  var isMongoConnected: boolean;
}

global.isMongoConnected = false;

async function dbConnect() {
  if (global.isMongoConnected) {
    console.log("already connected");
    return;
  }
  try {
    console.log("new connect");
    await mongoose.connect(process.env.DB_URI as string);
    console.log("connected");
    global.isMongoConnected = true;
  } catch (err) {
    throw err;
  }
}

export default dbConnect;
