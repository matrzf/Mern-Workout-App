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

// Allow requests from your frontend URL
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

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



