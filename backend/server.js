import path from "path";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";

import connectToMongoDB from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

// Configure CORS for the Express application
app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? ["https://chatterboxing.netlify.app", "https://real-time-chat-application-chatterbox.netlify.app", "https://chatterbox-app.netlify.app"] 
    : "http://localhost:3000",
  credentials: true // Allow credentials (cookies)
}));

app.use(express.json()); //to parse the incoming requests with JSON playloads (from req.body)
app.use(cookieParser());

// Serve static files from the 'backend/uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);

app.get('/ping', (req, res) => {
  res.status(200).send('App is awake');
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server runing  on port ${PORT}`);
});
