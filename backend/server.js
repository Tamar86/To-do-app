//importing modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
//initializing express application
const app = express();
const authMiddleware = require('./middleware/authMiddleware')
//to load environment variables from .env file into process.env
require("dotenv").config();
//storing MongoDB connection URI to connect to the MongoDB database
const uri = process.env.MONGODB_URI;
//parses incoming request bodies in JSON format

app.use(bodyParser.json());
//enables Cross-Origin Recourse Sharing, allowing controlled access to resources located on other domains
app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
//establishes a connection to the MongoDB database specified by URL
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
//route handlers imported from separate files and mounted on specific routes using app.use()
const authRoutes = require("./router/authRoutes");
const todoRoutes = require("./router/todoRoutes");
const secureRoutes = require("./router/secure/secureRoutes")

app.use("/auth", authRoutes);
app.use("/todo",authMiddleware.verifyToken, todoRoutes);
app.use('/secure', authMiddleware.verifyToken, secureRoutes)
//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke!");
});
//server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
