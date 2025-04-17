import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { sendMessage, getMessages, uploadFile } from "../controllers/message.controller.js"; // Import uploadFile
import protectRoute from "../middleware/protectRoute.js";

// Ensure uploads directory exists
const uploadDir = path.join(path.resolve(), 'backend/uploads'); // Use path.resolve() for absolute path
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files to backend/uploads/
  },
  filename: function (req, file, cb) {
    // Create a unique filename: timestamp + original name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

// Define the file upload route
// It uses protectRoute for authentication
// upload.single('file') middleware processes a single file named 'file'
router.post("/upload", protectRoute, upload.single('file'), uploadFile);

export default router;
