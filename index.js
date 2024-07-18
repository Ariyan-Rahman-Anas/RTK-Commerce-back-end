const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5001;
const app = express();
const dbConfig = require("./src/config/dbConfig");
dbConfig();

const authRoute = require("./src/route/authRoute");
const productsRoute = require("./src/route/productsRoute");

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.send({ message: "RTK-Commerce server is running..." });
});

// Start server
app.listen(port, () => {
  console.log(
    `RTK-Commerce server is running on port: http://localhost:${port}`
  );
});

// All routes
app.use(authRoute);
app.use(productsRoute);