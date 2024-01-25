import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(uri);
    return connect;
} catch (err) {
    console.log("connection to the database failed: ", err);
  }
};

export default dbConnect;
