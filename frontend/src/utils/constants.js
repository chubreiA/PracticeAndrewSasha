export const CATEGORIES = [
	'Авто',
	'Нерухомість',
	'Електроніка',
	'Робота',
	'Послуги',
	'Інше',
]

export const API_ENDPOINTS = {
	AUTH: {
		REGISTER: '/auth/register',
		LOGIN: '/auth/login',
		ME: '/auth/me',
	},
	ADS: {
		BASE: '/ads',
		MY_ADS: '/ads/my',
		SINGLE: id => `/ads/${id}`,
	},
}

export const MESSAGES = {
	SUCCESS: {
		CREATE_AD: 'Оголошення успішно створено',
		UPDATE_AD: 'Оголошення успішно оновлено',
		DELETE_AD: 'Оголошення успішно видалено',
		LOGIN: 'Ви успішно увійшли',
		REGISTER: 'Реєстрація успішна',
	},
	ERROR: {
		CREATE_AD: 'Помилка при створенні оголошення',
		UPDATE_AD: 'Помилка при оновленні оголошення',
		DELETE_AD: 'Помилка при видаленні оголошення',
		LOAD_ADS: 'Помилка при завантаженні оголошень',
		LOGIN: 'Помилка при вході',
		REGISTER: 'Помилка при реєстрації',
		UNAUTHORIZED: 'Необхідно увійти в систему',
	},
}
