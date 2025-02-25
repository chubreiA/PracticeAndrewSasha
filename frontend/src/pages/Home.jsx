import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AdCard from '../components/AdCard'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchBar from '../components/SearchBar'
import { useUser } from '../contexts/UserContext'
import useDebounce from '../hooks/useDebounce'
import { deleteAd, getAds } from '../services/ads'

const Home = () => {
	const [ads, setAds] = useState([])
	const [loading, setLoading] = useState(true)
	const [filters, setFilters] = useState({
		search: '',
		category: '',
		minPrice: '',
		maxPrice: '',
		sortBy: 'newest',
	})
	const { user } = useUser()
	const navigate = useNavigate()

	const debounceFilters = useDebounce(filters, 500)

	useEffect(() => {
		console.log("Поточна категорія:", filters.category);
		loadAds()
	}, [debounceFilters])

	const loadAds = async () => {
		try {
			setLoading(true)
			const response = await getAds(filters)
			let sortedAds = [...response]

			// Сортування на фронтенді
			switch (filters.sortBy) {
				case 'expensive':
					sortedAds.sort((a, b) => b.price - a.price)
					break
				case 'cheap':
					sortedAds.sort((a, b) => a.price - b.price)
					break
				case 'oldest':
					sortedAds.sort(
						(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
					)
					break
				default: // newest
					sortedAds.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
					)
			}

			setAds(sortedAds)
		} catch (error) {
			console.error('Error loading ads:', error)
			toast.error('Помилка завантаження оголошень')
			setAds([])
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

	const handleEdit = ad => {
		navigate(`/edit-ad/${ad._id}`)
	}

	if (loading) return <LoadingSpinner />

	return (
		<div>
			<SearchBar
				filters={filters}
				setFilters={setFilters}
				onReset={() => loadAds()}
			/>

			{ads.length === 0 ? (
				<div className='text-center py-8 text-gray-500'>
					Оголошень не знайдено
				</div>
			) : (
				<Grid container spacing={3}>
					{ads.map(ad => (
						<Grid item xs={12} sm={6} md={4} key={ad._id}>
							<AdCard ad={ad} onDelete={handleDelete} onEdit={handleEdit} />
						</Grid>
					))}
				</Grid>
			)}
		</div>
	)
}

export default Home
