export const formatPrice = (price) => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
};

export const validateAdForm = (formData) => {
  const errors = {};

  if (!formData.title?.trim()) {
    errors.title = 'Заголовок обов\'язковий';
  }

  if (!formData.description?.trim()) {
    errors.description = 'Опис обов\'язковий';
  }

  if (!formData.price || formData.price <= 0) {
    errors.price = 'Введіть коректну ціну';
  }

  if (!formData.category) {
    errors.category = 'Виберіть категорію';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const getImagePlaceholder = (category) => {
  const placeholders = {
    'Авто': '/car-placeholder.webp',
    'Нерухомість': '/realty-placeholder.jpg',
    'Електроніка': '/electronics-placeholder.jpg',
    'Робота': '/job-placeholder.webp',
    'Послуги': '/services-placeholder.jpg',
    'Інше': '/default-placeholder.jpg'
  };

  return placeholders[category] || placeholders['Інше'];
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const handleApiError = (error) => {
  if (error.response) {
    // Помилка від сервера
    const message = error.response.data.message || MESSAGES.ERROR.GENERAL;
    return message;
  } else if (error.request) {
    // Помилка мережі
    return "Помилка з'єднання з сервером";
  } else {
    // Інші помилки
    return 'Щось пішло не так';
  }
};