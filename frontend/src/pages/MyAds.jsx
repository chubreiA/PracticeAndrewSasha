import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AdCard from '../components/AdCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { deleteAd, getUserAds } from '../services/ads'

const MyAds = () => {
	const [ads, setAds] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadAds()
	}, [])

	const loadAds = async () => {
		try {
			const data = await getUserAds()
			setAds(data)
		} catch (error) {
			toast.error('Помилка завантаження оголошень')
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async id => {
		try {
			await deleteAd(id)
			toast.success('Оголошення видалено')
			loadAds()
		} catch (error) {
			toast.error('Помилка видалення оголошення')
		}
	}

	if (loading) return <LoadingSpinner />

	return (
		<div>
			<Typography variant='h4' component='h1' className='mb-6'>
				Мої оголошення
			</Typography>

			{ads.length === 0 ? (
				<Typography>У вас поки немає оголошень</Typography>
			) : (
				<Grid container spacing={3}>
					{ads.map(ad => (
						<Grid item xs={12} sm={6} md={4} key={ad._id}>
							<AdCard ad={ad} onDelete={handleDelete} />
						</Grid>
					))}
				</Grid>
			)}
		</div>
	)
}

export default MyAds
