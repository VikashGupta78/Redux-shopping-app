require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db"); // Import database connection
const AuthRouter = require('./routes/AuthRouter');

const app = express(); 
const PORT = process.env.PORT || 5000;
 
// Middleware
app.use(express.json());
app.use(cors());

app.use('/auth', AuthRouter);

// Routes
const razorpayRoutes = require("./config/payment");
app.use("/razorpay", razorpayRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running fine");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





