// testDbConnection.js
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CON_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connected successfully"))
.catch((err) => console.error("Database connection failed:", err));
