const express = require('express');
require("dotenv").config();
const bodyParser = require("body-parser");
const setupDatabase = require('./models/setupDatabase');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');

const snippetRoutes = require('./routes/snippetRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // React app's URL
  credentials: true, // Allow cookies to be sent with the request
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser()); 

// session configuration

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "default_secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
//       maxAge: 1000 * 60 * 60,
//     },
//   })
// );


app.use('/api', snippetRoutes);
app.use('/api/user', userRoutes);


// Serve React static files
app.use(express.static(path.join(__dirname, 'views', 'dist')));


app.get("/", async(req, res) => {
  // res.json({ message: 'API is working!' });
  res.sendFile(path.join(__dirname, 'views', 'dist', 'index.html'));
})


// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// })

setupDatabase()
  .then(() => {
    // only start server if DB setup succeeds
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Server not started due to DB error:", err);
    process.exit(1);
  });