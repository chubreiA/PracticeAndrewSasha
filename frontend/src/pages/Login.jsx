import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

const Login = () => {
	const navigate = useNavigate()
	const { login } = useUser()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await login(formData)
			toast.success('Успішний вхід')
			navigate('/')
		} catch (error) {
			toast.error('Помилка входу')
		}
	}

	return (
		<div className='max-w-md mx-auto'>
			<Card>
				<CardContent className='space-y-4'>
					<Typography variant='h5' component='h1' className='text-center mb-4'>
						Вхід
					</Typography>

					<form onSubmit={handleSubmit} className='space-y-4'>
						<TextField
							fullWidth
							label='Email'
							type='email'
							value={formData.email}
							onChange={e =>
								setFormData({ ...formData, email: e.target.value })
							}
							required
						/>

						<TextField
							fullWidth
							label='Пароль'
							type='password'
							value={formData.password}
							onChange={e =>
								setFormData({ ...formData, password: e.target.value })
							}
							required
						/>

						<Button
							type='submit'
							variant='contained'
							color='primary'
							fullWidth
							size='large'
						>
							Увійти
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default Login
