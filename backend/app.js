const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRouter = require('./routes/auth')
const adsRouter = require('./routes/ads')

const app = express()

app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)

// Middleware
app.use(express.json())

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/ads', adsRouter)

// Error handling
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
