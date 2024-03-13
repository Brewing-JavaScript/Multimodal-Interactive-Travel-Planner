import mongoose from "mongoose";
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { v2 } from "cloudinary";
import cloudinary from "cloudinary";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";
import multer from "multer";
import "dotenv/config";
import cron from "node-cron";
import jwt from "jsonwebtoken";
import cors from "cors";
import User from "./schema/UserSchems.js";
import axios from 'axios'

// Load the MobileNet model

const server = express();

server.use(express.json());
server.use(cors());

const genAI = new GoogleGenerativeAI("AIzaSyDbUQj2jSe1THDWuFVdGKRCJ7ozrzd1MyA");

let PORT = 5000;

mongoose.connect(
  "mongodb+srv://varad:varad6862@cluster0.0suvvd6.mongodb.net/recursion",
  {
    autoIndex: true,
  }
);

// const storage = multer.diskStorage({
//   destination: "./Uploaded_Images/",
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage }).single("image");

// Handle image upload and processing

const upload = multer({
  dest: "./Uploaded_Images/",
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
  storage: multer.diskStorage({
    destination: "./Uploaded_Images/",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }

    cb(null, true);
  },
});


server.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imagePath = req.file.path;

    // Make an HTTP POST request to your Python server for image processing
    const response = await axios.post('http://127.0.0.1:8000/process_image', {
      image_path: imagePath, // Send the image path to the Python server
    });

    const prediction = response.data.prediction;
    res.json({ prediction });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.get("/classify-image", async (req, res) => {
  const imagePath = path.resolve(__dirname, "./taj.png"); // Provide the path to your image
  try {
    const predictions = await classifyImage(imagePath);
    res.json({ predictions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server

const sendEmail = async function (data, user) {
  console.log("varad");
  const transporter = nodemailer.createTransport({
    // host:process.env.SMPT_HOST,
    // port: process.env.SMPT_PORT,
    host: "smtp.elasticemail.com",
    port: 587,
    secure: false,
    auth: {
      user: "fakeacc6862@gmail.com",

      pass: "47E85993DC7394854F4E87B9F47289D636F1",
    },
  });

  const emailTemplate = "";

  await transporter.sendMail({
    // from: process.env.SMPT_FROM_HOST ,
    from: "fakeacc6862@gmail.com",
    to: user,
    subject: "new placement offer from your college",
    html: emailTemplate,
  });
};
const sendEmail2 = async function (data, user) {
  console.log("varad");
  const transporter = nodemailer.createTransport({
    // host:process.env.SMPT_HOST,
    // port: process.env.SMPT_PORT,
    host: "smtp.elasticemail.com",
    port: 587,
    secure: false,
    auth: {
      user: "fakeacc6862@gmail.com",

      pass: "47E85993DC7394854F4E87B9F47289D636F1",
    },
  });

  const emailTemplate = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Congratulations!</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              margin-bottom: 30px;
          }
          .header h1 {
              color: #333;
          }
          .message {
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 5px;
              text-align: center;
          }
          .message h2 {
              color: #007bff;
              margin-bottom: 10px;
          }
          .signature {
              margin-top: 30px;
              text-align: center;
          }
          .signature p {
              margin: 5px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Congratulations!</h1>
          </div>
          <div class="message">
              <h2>You are hired!</h2>
              <p>We are thrilled to inform you that you have been hired at [Company Name].</p>
              <p>Welcome to the team! We look forward to working with you and achieving great success together.</p>
          </div>
          <div class="signature">
              <p>Best regards,</p>
              <p>${data}</p>
             
          </div>
      </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    // from: process.env.SMPT_FROM_HOST ,
    from: "fakeacc6862@gmail.com",
    to: user,
    subject: "new placement offer from your college",
    html: emailTemplate,
  });
};

// function myTask() {
//   console.log("Cron job is running...");
// }

// // Schedule a cron job to run myTask every minute
// cron.schedule("* 0 * * * *", myTask);

const formatDataToSend = (user) => {
  const access_token = jwt.sign(
    {
      id: user._id,
    },
    "varad177"
  );

  return {
    access_token,
    email: user.email,
    username: user.username,
    _id: user._id,
    status: user.status,
  };
};

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      error: "no access token",
    });
  }

  jwt.verify(token, "varad177", (err, user) => {
    if (err) {
      return res.status(403).json({
        error: "access token invalid",
      });
    }

    req.user = user.id;
    next();
  });
};

// config cloudinary
v2.config({
  cloud_name: "do8ji7uqc",
  api_key: "738935516257416",
  api_secret: "DX5PLGdpT-OBOxYhTlq6l5vCNxY",
});

//server creates above

//all routes come below

server.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    return newUser.save().then((u) => {
      return res.status(200).json(formatDataToSend(u));
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

server.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Check if the user exists with the provided email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the stored password

    if (user.password != password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json(formatDataToSend(user));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//compony routes

//gemini

server.post("/google", async (req, res) => {
  const { prompt } = req.body;

  console.log(prompt);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return res.status(200).json(text);
});

server.listen(PORT, () => {
  console.log(`listing on ${PORT}`);
});
