// Import the necessary dependencies
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import productRouter from "./Routes/productRoute.js";

// Create the app and Port
const app = express();
const PORT = process.env.PORT || 3000;

// Use the middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Establish connection with database
async function connect() {
  await mongoose.connect(process.env.MONGO_URI);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server initialized at http://localhost:${PORT}`);
  connect().then(() => {
    console.log("Connection with database successful");
  });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://stellar-shop-frontend.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Index route
app.get("/", (req, res) => {
  res.send("Welcome to Stellar Shop");
});

// Product routes
app.use("/api/products", productRouter);

// Create error handling middleware
app.use((err, req, res, next) => {
  if (!res.headersSent) {
    res.status(err.status).send(err);
  } else {
    next(err);
  }
});

// Handle 404 error for pages
app.all("*", (req, res) => {
  res.status(404).send("Sorry, page not found!");
});
