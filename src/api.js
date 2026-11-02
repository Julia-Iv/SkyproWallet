const BASE_URL = "https://wedev-api.sky.pro/api";

const api = async (endpoint, options = {}) => {
  const url = `${BASE_URL}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
  options.headers = {
    ...options.headers,
  };

  const token = localStorage.getItem("token");
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.warn("В localStorage отсутствует 'token' при вызове:", endpoint);
  }

  if (options.body && typeof options.body === "object") {
    options.body = JSON.stringify(options.body);
  }

  // Для transactions не добавляем Content-Type, но объект превращаем в JSON-строку
  else if (endpoint.includes("transactions")) {
    if (options.body && typeof options.body === "object") {
      options.body = JSON.stringify(options.body);
    }
    delete options.headers["Content-Type"];
  }
  // Выводим в консоль для проверки перед отправкой
  console.log(
    `[Fetch Request] ${options.method || "GET"} ${url}`,
    options.headers,
  );

  const response = await fetch(url, options);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized: Неверный токен или сессия истекла");
    }

    // Считываем JSON-ответ сервера с подробным описанием ошибки
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.error ||
      errorData.message ||
      `Ошибка сервера: ${response.status}`;

    throw new Error(errorMessage);
  }

  return response.json();
};

export default api;
