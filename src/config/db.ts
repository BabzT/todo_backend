import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db: Db;

export const connectToDatabase = async () => {
  try {
    await client.connect();
    db = client.db("todo_app");
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const getDb = (): Db => {
  if (!db) {
    throw new Error("Database not connected. Call connectToDatabase first.");
  }
  return db;
};
