import { Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AdForm from '../components/AdForm'
import { createAd } from '../services/ads'

const CreateAd = () => {
	const navigate = useNavigate()

	const handleSubmit = async formData => {
		try {
			await createAd(formData)
			toast.success('Оголошення створено')
			navigate('/')
		} catch (error) {
			toast.error('Помилка створення оголошення')
		}
	}

	return (
		<div className='max-w-2xl mx-auto'>
			<Typography variant='h4' component='h1' className='mb-6'>
				Створити оголошення
			</Typography>
			<AdForm onSubmit={handleSubmit} />
		</div>
	)
}

export default CreateAd
