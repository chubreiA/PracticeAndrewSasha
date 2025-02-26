import { ExpandLess, ExpandMore, Search } from '@mui/icons-material'
import {
	Box,
	Button,
	Collapse,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material'
import { useState } from 'react'

const SearchBar = ({ filters, setFilters, onReset }) => {
	const [showAdvanced, setShowAdvanced] = useState(false)

	const handleChange = field => event => {
		const value = event.target.value
		console.log(`Changing ${field} to:`, value) // Debug log
		setFilters(prev => ({
			...prev,
			[field]: value === '' ? '' : Number(value),
		}))
	}

	const handleReset = () => {
		setFilters({
			search: '',
			category: '',
			minPrice: '',
			maxPrice: '',
			sortBy: 'newest',
		})
		onReset?.()
	}

	const categories = [
		{ label: 'Всі категорії', value: '' },
		{ label: 'Авто', value: 'Авто' },
		{ label: 'Нерухомість', value: 'Нерухомість' },
		{ label: 'Електроніка', value: 'Електроніка' },
		{ label: 'Робота', value: 'Робота' },
		{ label: 'Послуги', value: 'Послуги' },
		{ label: 'Інше', value: 'Інше' },
	]

	return (
		<Box sx={{ mb: 3 }}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						placeholder='Пошук оголошень...'
						value={filters.search}
						onChange={handleChange('search')}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<FormControl fullWidth>
						<InputLabel>Категорія</InputLabel>
						<Select
							value={filters.category}
							onChange={handleChange('category')}
							label='Категорія'
						>
							{categories.map(cat => (
								<MenuItem key={cat.value} value={cat.value}>
									{cat.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={3}>
					<FormControl fullWidth>
						<InputLabel>Сортування</InputLabel>
						<Select
							value={filters.sortBy}
							onChange={handleChange('sortBy')}
							label='Сортування'
						>
							<MenuItem value='newest'>Спочатку новіші</MenuItem>
							<MenuItem value='oldest'>Спочатку старіші</MenuItem>
							<MenuItem value='expensive'>Від дорогих до дешевих</MenuItem>
							<MenuItem value='cheap'>Від дешевих до дорогих</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>

			<Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
				<Button
					variant='outlined'
					onClick={() => setShowAdvanced(!showAdvanced)}
					endIcon={showAdvanced ? <ExpandLess /> : <ExpandMore />}
				>
					Розширений пошук
				</Button>
				<Button variant='outlined' onClick={handleReset}>
					Скинути фільтри
				</Button>
			</Box>

			<Collapse in={showAdvanced}>
				<Grid container spacing={2} sx={{ mt: 1 }}>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label='Мінімальна ціна'
							type='number'
							value={filters.minPrice}
							onChange={handleChange('minPrice')}
							InputProps={{
								endAdornment: <InputAdornment position='end'>₴</InputAdornment>,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label='Максимальна ціна'
							type='number'
							value={filters.maxPrice}
							onChange={handleChange('maxPrice')}
							InputProps={{
								endAdornment: <InputAdornment position='end'>₴</InputAdornment>,
							}}
						/>
					</Grid>
				</Grid>
			</Collapse>
		</Box>
	)
}

export default SearchBar
