const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/register', async (req, res) => {
	try {
		const user = new User(req.body)
		await user.save()

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
		res.status(201).json({ user, token })
	} catch (error) {
		res
			.status(400)
			.json({ message: 'Registration failed', error: error.message })
	}
})

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })

		if (!user || !(await user.comparePassword(password))) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
		res.json({ user, token })
	} catch (error) {
		res.status(400).json({ message: 'Login failed', error: error.message })
	}
})

router.get('/me', auth, async (req, res) => {
	res.json(req.user)
})

module.exports = router
