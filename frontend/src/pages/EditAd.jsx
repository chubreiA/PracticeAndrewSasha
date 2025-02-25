import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import AdForm from '../components/AdForm'
import LoadingSpinner from '../components/LoadingSpinner'
import { getAd, updateAd } from '../services/ads'

const EditAd = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [ad, setAd] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadAd()
	}, [id])

	const loadAd = async () => {
		try {
			const data = await getAd(id)
			setAd(data)
		} catch (error) {
			toast.error('Помилка завантаження оголошення')
			navigate('/my-ads')
		} finally {
			setLoading(false)
		}
	}

	const handleSubmit = async formData => {
		try {
			await updateAd(id, formData)
			toast.success('Оголошення оновлено')
			navigate('/my-ads')
		} catch (error) {
			toast.error('Помилка оновлення оголошення')
		}
	}

	if (loading) return <LoadingSpinner />

	return (
		<div className='max-w-2xl mx-auto'>
			<Typography variant='h4' component='h1' className='mb-6'>
				Редагувати оголошення
			</Typography>
			{ad && <AdForm onSubmit={handleSubmit} initialData={ad} />}
		</div>
	)
}

export default EditAd
