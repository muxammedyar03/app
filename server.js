const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Configurations
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Portni o‘qish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
