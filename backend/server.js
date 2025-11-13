require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express();

// middleware to be able to access a request that has a BODY (data)
// such as POST and PATCH
app.use(express.json());

// CORS setup
const allowedOrigins = [
  'http://localhost:3000', // dev frontend
  'https://workout-app-proj.vercel.app', // production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like Postman or server-to-server
      if (!origin) return callback(null, true);
      // if origin matched, allow the request and set the Access-Control-Allow-Origin header
      // otherwise reject
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed for this origin'));
      }
    },
    credentials: true, // if using cookies or sessions
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // any headers you send
  })
);

// // middleware to log reqs
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next(); // to continue to the next piece of middleware
// });

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log('connected to db and listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
