import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#2563eb', // blue-600
			light: '#3b82f6', // blue-500
			dark: '#1d4ed8', // blue-700
		},
		secondary: {
			main: '#059669', // emerald-600
			light: '#10b981', // emerald-500
			dark: '#047857', // emerald-700
		},
		error: {
			main: '#dc2626', // red-600
		},
		background: {
			default: '#f9fafb', // gray-50
			paper: '#ffffff',
		},
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
		].join(','),
		h1: {
			fontSize: '2.5rem',
			fontWeight: 600,
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 600,
		},
		h3: {
			fontSize: '1.75rem',
			fontWeight: 600,
		},
		h4: {
			fontSize: '1.5rem',
			fontWeight: 600,
		},
		h5: {
			fontSize: '1.25rem',
			fontWeight: 600,
		},
		h6: {
			fontSize: '1rem',
			fontWeight: 600,
		},
		button: {
			textTransform: 'none', // Відключаємо автоматичні великі літери для кнопок
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '0.5rem',
					padding: '0.5rem 1rem',
				},
				contained: {
					boxShadow: 'none',
					'&:hover': {
						boxShadow: 'none',
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: '0.75rem',
					boxShadow:
						'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						borderRadius: '0.5rem',
					},
				},
			},
		},
	},
})

export default theme
