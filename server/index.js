import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/users", userRouter); 
app.use("/tour", tourRouter);
app.get("/", (req, res) => {
  res.send("Welcome to tour API");
});

const port = process.env.PORT || 5000;

const DB = "mongodb://localhost:27017/tours";

mongoose.connect(DB)
    .then(() => {
        // Binding to 0.0.0.0 to make the app accessible from outside the container
        app.listen(port, '0.0.0.0', () => 
            console.log(`App running on port ${port}`)
        );
    })
    .catch((error) => console.log(`${error} did not connect`));
