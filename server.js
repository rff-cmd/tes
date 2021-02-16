const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const userApi = require("./routes/user.auth");
const categoryApi = require("./routes/category.auth");
const productApi = require("./routes/product.route");

const app = express();
require("dotenv").config({
  path: "./config/index.env",
});

const connectDB = require("./config/db");
connectDB();

app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// route
app.use("/api/user/", userApi);
app.use("/api/category", categoryApi);
app.use("/api/product", productApi);
app.get("/", (req, res) => {
  res.send("test route > Home page");
});

// Page Not Found
app.use((req, res) => {
  res.status(404).json({
    msg: "Page not found",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
