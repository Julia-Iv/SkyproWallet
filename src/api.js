import axios from "axios";


const api = axios.create({
  baseURL: "https://wedev-api.sky.pro/api",
});
api.interceptors.request.use(
  (config) => {
    // Подставляем токен из localStorage для защищенных эндпоинтов
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Разделение логики контента:
    if (config.url && config.url.includes("user")) {
      // Для логина и регистрации передаем данные строго как обычный объект JSON
      config.headers["Content-Type"] = "application/json";

      // Если данные уже были случайно превращены в строку в компоненте,
      // парсим обратно в объект, чтобы Axios сам отправил чистый JSON
      if (typeof config.data === "string") {
        try {
          config.data = JSON.parse(config.data);
        } catch (e) {
          // оставляем как есть
        }
      }
    } else {
      // Для ВСЕХ остальных запросов (расходы /transactions) убираем JSON-заголовок
      if (config.data && typeof config.data === "object") {
        config.data = JSON.stringify(config.data);

        if (config.headers.delete) {
          config.headers.delete("Content-Type");
        } else {
          delete config.headers["Content-Type"];
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default api;
