import api from './api'

export const getAds = async (filters = {}) => {
	try {
		const params = {
			search: filters.search,
			category: filters.category, // Make sure this matches the backend parameter name
			minPrice: filters.minPrice,
			maxPrice: filters.maxPrice,
		}

		// Clean empty params
		Object.keys(params).forEach(key => {
			if (!params[key] && params[key] !== 0) {
				delete params[key]
			}
		})

		const response = await api.get('/ads', { params })
		return response.data || []
	} catch (error) {
		console.error('API Error:', error)
		throw error // Propagate error to handle it in the component
	}
}

export const getUserAds = async () => {
	const response = await api.get('/ads/my')
	return response.data
}

export const createAd = async adData => {
	const response = await api.post('/ads', adData)
	return response.data
}

export const updateAd = async (id, adData) => {
	const response = await api.put(`/ads/${id}`, adData)
	return response.data
}

export const deleteAd = async id => {
	const response = await api.delete(`/ads/${id}`)
	return response.data
}

export const getAd = async id => {
	const response = await api.get(`/ads/${id}`)
	return response.data
}
