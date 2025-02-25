import { AccountCircle } from '@mui/icons-material'
import {
	AppBar,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

const Navbar = () => {
	const { user, logout } = useUser()
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = useState(null)

	const handleMenu = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		logout()
		handleClose()
		navigate('/')
	}

	return (
		<AppBar position='static' className='bg-blue-600'>
			<Toolbar className='justify-between'>
				<Link to='/' className='text-white no-underline'>
					<Typography variant='h6' className='font-bold'>
						Дошка оголошень
					</Typography>
				</Link>

				<div className='flex items-center gap-4'>
					{user ? (
						<>
							<Button
								component={Link}
								to='/create-ad'
								variant='contained'
								color='secondary'
								className='bg-green-500 hover:bg-green-600'
							>
								Створити оголошення
							</Button>

							<IconButton onClick={handleMenu} color='inherit'>
								<AccountCircle />
							</IconButton>

							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem component={Link} to='/my-ads' onClick={handleClose}>
									Мої оголошення
								</MenuItem>
								<MenuItem onClick={handleLogout}>Вийти</MenuItem>
							</Menu>
						</>
					) : (
						<>
							<Button component={Link} to='/login' color='inherit'>
								Увійти
							</Button>
							<Button
								component={Link}
								to='/register'
								variant='contained'
								color='secondary'
							>
								Реєстрація
							</Button>
						</>
					)}
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
