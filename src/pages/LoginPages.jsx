import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./LoginPages.styled";
import api from "../api";

const LoginPages = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      // Отправляем реальный запрос на бэкенд Skypro для входа
      const response = await api.post("user/login", {
        login: email, // wedev-api принимает поле под ключом 'login'
        password: password,
      });

      // Извлекаем токен из структуры ответа wedev-api
      const token = response.data.user?.token || response.data.token;

      if (token) {
        // Сохраняем токен в localStorage под ключом 'token'
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Перенаправляем на страницу расходов только ПОСЛЕ успешного получения токена
        navigate("/expenses");
      } else {
        setError("Не удалось получить токен авторизации от сервера");
      }
    } catch (err) {
      console.error("Ошибка при авторизации:", err);
      // Выводим текст ошибки, который прислал сервер (например, "Неверный логин или пароль")
      const serverMessage =
        err.response?.data?.error || err.response?.data?.message;
      setError(
        serverMessage || "Произошла ошибка при входе. Попробуйте позже.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <S.GlobalStyle />

      <S.HeaderWrapper>
        <S.HeaderLogo>
          {/* Фирменная иконка Skypro.Wallet из трех столбцов */}
          <S.HeaderLogoIconSvg>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </S.HeaderLogoIconSvg>
          <S.HeaderLogoText>Skypro.Wallet</S.HeaderLogoText>
        </S.HeaderLogo>
      </S.HeaderWrapper>

      {/* Центрирующий контейнер */}
      <S.PageWrapper>
        <S.Card>
          <S.Title>Вход</S.Title>

          <S.Form onSubmit={handleSubmit}>
            {/* Поле Email */}
            <S.InputGroup>
              <S.Input
                type="email"
                placeholder="Логин"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                $hasError={!!error}
              />
            </S.InputGroup>

            {/* Поле Пароль */}
            <S.InputGroup>
              <S.Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                $hasError={!!error}
                disabled={isLoading}
              />
            </S.InputGroup>

            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

            <S.SubmitBtn type="submit">Войти</S.SubmitBtn>
          </S.Form>

          <S.Footer>
            <span>Нужен новый аккаунт?</span>
            <S.LinkBtn onClick={() => navigate("/register")}>
              Регистрация здесь
            </S.LinkBtn>
          </S.Footer>
        </S.Card>
      </S.PageWrapper>
    </>
  );
};

export default LoginPages;
