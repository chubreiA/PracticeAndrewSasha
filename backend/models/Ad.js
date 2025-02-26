const mongoose = require('mongoose')

const adSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
		enum: ['Авто', 'Нерухомість', 'Електроніка', 'Робота', 'Послуги', 'Інше'],
	},
	image: {
		type: String,
		default: '',
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Ad = mongoose.model('Ad', adSchema)

module.exports = Ad
