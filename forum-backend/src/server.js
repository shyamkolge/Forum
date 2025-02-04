import dotenv from 'dotenv';
dotenv.config({ path: ".env" });

import { app } from "./app.js";
import connectDB from "./db/index.js";

// Function to start the server after DB connection is successful
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process on DB failure
  }
};

// Start the server
startServer();
