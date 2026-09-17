const express = require('express')
const dotenv =  require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const eventRoutes = require('./routes/event')
const bookingRoutes = require('./routes/booking')



dotenv.config();

const app = express()
app.use(cors());
app.use(express.json())

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);



//Connect to DB
mongoose.connect(process.env.MONGODB_URI)
.then(() =>{
    console.log("Connected to DB")
})
.catch((error) => {
    console.error("Error connected to DB", error)
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})