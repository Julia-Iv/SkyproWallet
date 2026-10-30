import axios from "axios";


const api = axios.create({
  baseURL: "https://wedev-api.sky.pro/api",
});
api.interceptors.request.use(
  (config) => {
    // Подставляем токен из localStorage для защищенных эндпоинтов
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    //  Если это логин или регистрация (/user), отправляем стандартный JSON
    if (config.url && config.url.includes("user")) {
      config.headers.set("Content-Type", "application/json");
    }
    // Если это РАСХОДЫ (/transactions), преобразуем объект в текстовую строку параметров URL
    else if (config.data && typeof config.data === "object") {
      const textParams = new URLSearchParams();
      Object.entries(config.data).forEach(([key, value]) => {
        textParams.append(key, value);
      });

      // Превращаем объект в сырую строку вида name=Пятерочка&amount=3500...
      config.data = textParams.toString();

      // Устанавливаем text/plain, чтобы сервер не ругался на формат json
      config.headers.set("Content-Type", "text/plain");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default api;
