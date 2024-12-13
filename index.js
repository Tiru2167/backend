import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv"; // Added dotenv for environment variables
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/users", userRouter);
app.use("/tour", tourRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the Tour API");
});

// Environment Variables
const port = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

// MongoDB Connection
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, "0.0.0.0", () =>
      console.log(`Server running on port ${port}`)
    );
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  });

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong, please try again later" });
});
