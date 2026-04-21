import "dotenv/config";
import { connectToDatabase } from "./config/db";
import app from "./app";

const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});
