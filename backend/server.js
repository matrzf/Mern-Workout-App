require('dotenv').config()

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

//Import routes
const workoutsRoutes = require('./routes/workoutsRoute')
const userRoutes = require('./routes/userRoute')

//Express app
const app = express();

// List of allowed origins
const allowedOrigins = [
  'https://mern-workout-app-frontend-fens.onrender.com',
  'localhost:3000' // Add any additional origins here
];

// Custom CORS configuration
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// Use the CORS middleware with the custom options
app.use(cors(corsOptionsDelegate));

//Middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//Routes
app.use('/api/workouts', workoutsRoutes)
app.use('/api/user', userRoutes)

//Connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //Listen
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & Listening on port: ${process.env.PORT}`)
    })
  })
  .catch((err) => {console.log("Error1: ", err)})



