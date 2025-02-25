import { ThemeProvider } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { UserProvider } from './contexts/UserContext'
import CreateAd from './pages/CreateAd'
import EditAd from './pages/EditAd'
import Home from './pages/Home'
import Login from './pages/Login'
import MyAds from './pages/MyAds'
import Register from './pages/Register'
import theme from './theme'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
				<Router>
					<div className='min-h-screen bg-gray-50'>
						<Navbar />
						<div className='container mx-auto px-4 py-8'>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />
								<Route path='/create-ad' element={<CreateAd />} />
								<Route path='/edit-ad/:id' element={<EditAd />} />
								<Route path='/my-ads' element={<MyAds />} />
							</Routes>
						</div>
						<Toaster position='top-right' />
					</div>
				</Router>
			</UserProvider>
		</ThemeProvider>
	)
}

export default App
