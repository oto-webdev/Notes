import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import noteRoutes from './routes/noteRoute.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.options("*", cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use("/api/notes", noteRoutes)

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

startServer();
