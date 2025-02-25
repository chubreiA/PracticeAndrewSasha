import { Delete, Edit } from '@mui/icons-material'
import {
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
} from '@mui/material'
import { useUser } from '../contexts/UserContext'
import { getImagePlaceholder } from '../utils/helpers'

const AdCard = ({ ad, onEdit, onDelete }) => {
	const { user } = useUser()
	const isOwner = user && user._id === ad.author

	return (
		<Card className='h-full shadow-lg hover:shadow-xl transition-shadow'>
			<CardMedia
				component='img'
				height='200'
				image={ad.image || getImagePlaceholder(ad.category)}
				alt={ad.title}
				className='h-48 object-cover'
			/>
			<CardContent className='p-4'>
				<div className='flex justify-between items-start'>
					<Typography variant='h6' component='h3' className='font-bold'>
						{ad.title}
					</Typography>
					<Typography variant='h6' color='primary' className='font-bold'>
						{ad.price} ₴
					</Typography>
				</div>
				<Typography color='text.secondary' className='mt-2'>
					{ad.description}
				</Typography>
				<div className='flex justify-between items-center mt-4'>
					<Typography variant='body2' color='text.secondary'>
						{ad.category}
					</Typography>
					{isOwner && (
						<div className='flex gap-2'>
							{onEdit && (
								<IconButton
									size='small'
									onClick={() => onEdit(ad)}
									className='text-blue-500 hover:text-blue-700'
								>
									<Edit />
								</IconButton>
							)}
							{onDelete && (
								<IconButton
									size='small'
									onClick={() => onDelete(ad._id)}
									className='text-red-500 hover:text-red-700'
								>
									<Delete />
								</IconButton>
							)}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default AdCard
