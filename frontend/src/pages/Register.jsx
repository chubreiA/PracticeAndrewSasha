import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/auth'

const Register = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await register(formData)
			toast.success('Реєстрація успішна')
			navigate('/login')
		} catch (error) {
			toast.error('Помилка реєстрації')
		}
	}

	return (
		<div className='max-w-md mx-auto'>
			<Card>
				<CardContent className='space-y-4'>
					<Typography variant='h5' component='h1' className='text-center mb-4'>
						Реєстрація
					</Typography>

					<form onSubmit={handleSubmit} className='space-y-4'>
						<TextField
							fullWidth
							label="Ім'я"
							value={formData.name}
							onChange={e => setFormData({ ...formData, name: e.target.value })}
							required
						/>

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
							Зареєструватися
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default Register
