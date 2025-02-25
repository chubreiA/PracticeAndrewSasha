import { Box, CircularProgress } from '@mui/material'

const LoadingSpinner = () => {
	return (
		<Box className='flex justify-center items-center min-h-[200px]'>
			<CircularProgress />
		</Box>
	)
}

export default LoadingSpinner
