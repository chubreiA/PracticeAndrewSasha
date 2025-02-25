import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useState } from 'react'

const categories = [
	'Авто',
	'Нерухомість',
	'Електроніка',
	'Робота',
	'Послуги',
	'Інше',
]

const AdForm = ({ onSubmit, initialData = {} }) => {
	const [formData, setFormData] = useState({
		title: initialData.title || '',
		description: initialData.description || '',
		price: initialData.price || '',
		category: initialData.category || '',
		image: initialData.image || '',
	})

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit(formData)
	}

	return (
		<Box component='form' onSubmit={handleSubmit} className='space-y-4'>
			<TextField
				fullWidth
				label='Заголовок'
				value={formData.title}
				onChange={e => setFormData({ ...formData, title: e.target.value })}
				required
			/>
			<TextField
				fullWidth
				multiline
				rows={4}
				label='Опис'
				value={formData.description}
				onChange={e =>
					setFormData({ ...formData, description: e.target.value })
				}
				required
			/>
			<TextField
				fullWidth
				type='number'
				label='Ціна'
				value={formData.price}
				onChange={e => setFormData({ ...formData, price: e.target.value })}
				required
			/>
			<TextField
				fullWidth
				select
				label='Категорія'
				value={formData.category}
				onChange={e => setFormData({ ...formData, category: e.target.value })}
				required
			>
				{categories.map(category => (
					<MenuItem key={category} value={category}>
						{category}
					</MenuItem>
				))}
			</TextField>
			<TextField
				fullWidth
				label='URL зображення'
				value={formData.image}
				onChange={e => setFormData({ ...formData, image: e.target.value })}
			/>
			<Button
				type='submit'
				variant='contained'
				color='primary'
				fullWidth
				size='large'
			>
				{initialData._id ? 'Оновити оголошення' : 'Створити оголошення'}
			</Button>
		</Box>
	)
}

export default AdForm
