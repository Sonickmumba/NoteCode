const express = require('express');
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const snippetRoutes = require('./routes/snippetRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // React app's URL
  credentials: true, // Allow cookies to be sent with the request
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', snippetRoutes);
app.use('/api/', userRoutes);


app.get("/", async(req, res) => {
  res.json({ message: 'API is working!' });
})


app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
})