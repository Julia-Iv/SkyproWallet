import axios from 'axios';
const withoutJsonContentType = [
  (data, headers) => {
 if (headers && typeof headers.delete === 'function') {
      headers.delete('Content-Type');
    } else if (headers) {
      delete headers['Content-Type'];
    }   
     return data != null && typeof data === "object"
      ? JSON.stringify(data)
      : data;
  },
];
const api = axios.create({
    baseURL: 'https://wedev-api.sky.pro/api',
    transformRequest: withoutJsonContentType,

});
// ПЕРЕХВАТЧИК ДЛЯ АВТОМАТИЧЕСКОЙ ПОДСТАНОВКИ ТОКЕНА
api.interceptors.request.use((config) => {
    // Берем токен из localStorage. 
    const token = localStorage.getItem('token'); 
    
    // 2. Если токен есть в базе, добавляем его в заголовки запроса
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default api;