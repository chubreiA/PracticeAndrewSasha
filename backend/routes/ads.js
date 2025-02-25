const express = require('express')
const Ad = require('../models/Ad')
const auth = require('../middleware/auth')

const router = express.Router()

// Get all ads with optional filtering
router.get('/', async (req, res) => {
	try {
		const query = {}
		if (req.query.search) {
			query.$or = [
				{ title: new RegExp(req.query.search, 'i') },
				{ description: new RegExp(req.query.search, 'i') },
			]
		}

		const ads = await Ad.find(query).populate('author', 'name email')
		res.json(ads)
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error fetching ads', error: error.message })
	}
})

// Get user's ads
router.get('/my', auth, async (req, res) => {
	try {
		const ads = await Ad.find({ author: req.user._id })
		res.json(ads)
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error fetching your ads', error: error.message })
	}
})

// Create new ad
router.post('/', auth, async (req, res) => {
	try {
		const ad = new Ad({
			...req.body,
			author: req.user._id,
		})
		await ad.save()
		res.status(201).json(ad)
	} catch (error) {
		res.status(400).json({ message: 'Error creating ad', error: error.message })
	}
})

// Update ad
router.put('/:id', auth, async (req, res) => {
	try {
		const ad = await Ad.findOne({ _id: req.params.id, author: req.user._id })
		if (!ad) {
			return res.status(404).json({ message: 'Ad not found' })
		}

		Object.assign(ad, req.body)
		await ad.save()
		res.json(ad)
	} catch (error) {
		res.status(400).json({ message: 'Error updating ad', error: error.message })
	}
})

// Delete ad
router.delete('/:id', auth, async (req, res) => {
	try {
		const ad = await Ad.findOneAndDelete({
			_id: req.params.id,
			author: req.user._id,
		})
		if (!ad) {
			return res.status(404).json({ message: 'Ad not found' })
		}
		res.json({ message: 'Ad deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: 'Error deleting ad', error: error.message })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const ad = await Ad.findById(req.params.id).populate('author', 'name email')
		if (!ad) {
			return res.status(404).json({ message: 'Ad not found' })
		}
		res.json(ad)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching ad', error: error.message })
	}
})

module.exports = router
