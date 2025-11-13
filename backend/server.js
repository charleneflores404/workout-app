require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express();

// middleware to be able to access a request that has a BODY (data)
// such as POST and PATCH
app.use(express.json());

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
