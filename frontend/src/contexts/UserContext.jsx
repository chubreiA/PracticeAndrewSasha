import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			checkAuth(token)
		} else {
			setLoading(false)
		}
	}, [])

	const checkAuth = async token => {
		try {
			const response = await api.get('/auth/me', {
				headers: { Authorization: `Bearer ${token}` },
			})
			setUser(response.data)
		} catch (error) {
			localStorage.removeItem('token')
		} finally {
			setLoading(false)
		}
	}

	const login = async credentials => {
		const response = await api.post('/auth/login', credentials)
		const { token, user } = response.data
		localStorage.setItem('token', token)
		setUser(user)
	}

	const logout = () => {
		localStorage.removeItem('token')
		setUser(null)
	}

	return (
		<UserContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext)
