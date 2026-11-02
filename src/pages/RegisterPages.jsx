import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./RegisterPages.styled"; // Переиспользуем готовые стили карточки и шапки
import api from "../api";

const RegisterPages = () => {
  const navigate = useNavigate();

  // Состояния для полей формы регистрации
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Состояния ошибок для каждого инпута
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Общая серверная ошибка и состояние загрузки
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Сброс старых ошибок
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setServerError("");

    let isValid = true;

    // Валидация полей как на макете ("Поля 'И...'")
    if (!name) {
      setNameError("Введите ваше имя");
      isValid = false;
    }
    if (!email) {
      setEmailError("Введите логин или email");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Введите пароль");
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    try {
      // Отправляем реальный запрос на регистрацию
      const response = await api("user", {
        method: "POST",
        body: {
          name: name,
          login: email, // Бэкенд wedev-api принимает email в поле 'login'
          password: password,
        },
      });

      // Извлекаем токен из структуры ответа wedev-api
      const token = response.user?.token || response.token;

      if (token) {
        // Сохраняем токен в localStorage под ключом 'token'
        localStorage.setItem("token", token);

        // Перенаправляем на страницу расходов после успешной регистрации и авторизации
        navigate("/expenses");
      } else {
        setServerError("Не удалось получить токен авторизации от сервера");
      }
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      // Выводим текст ошибки, который прислал сервер (например, "Пользователь с таким логином уже существует")
      // Выводим текст ошибки, переданный из нашей обертки fetch
      setServerError(
        err.message || "Не удалось зарегистрироваться. Попробуйте позже.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <S.GlobalStyle />

      {/* Верхняя шапка — точная копия страницы входа с отступом 120px */}
      <S.HeaderWrapper>
        <S.HeaderLogo>
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

      {/* Контейнер страницы с карточкой */}
      <S.PageWrapper>
        <S.Card>
          <S.Title>Регистрация</S.Title>

          <S.Form onSubmit={handleSubmit}>
            {/* Поле Имя */}
            <S.InputGroup>
              <S.Input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError("");
                }}
                $hasError={!!nameError}
                disabled={isLoading}
              />
              {nameError && <S.ErrorMessage>{nameError}</S.ErrorMessage>}
            </S.InputGroup>

            {/* Поле Логин/Email */}
            <S.InputGroup>
              <S.Input
                type="email"
                placeholder="Логин"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                $hasError={!!emailError}
                disabled={isLoading}
              />
              {emailError && <S.ErrorMessage>{emailError}</S.ErrorMessage>}
            </S.InputGroup>

            {/* Поле Пароль */}
            <S.InputGroup>
              <S.Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                $hasError={!!passwordError}
                disabled={isLoading}
              />
              {passwordError && (
                <S.ErrorMessage>{passwordError}</S.ErrorMessage>
              )}
            </S.InputGroup>

            {/* Вывод ошибки от бэкенда, если логин занят */}
            {serverError && <S.ErrorMessage>{serverError}</S.ErrorMessage>}

            {/* Кнопка регистрации */}
            <S.SubmitBtn type="submit" disabled={isLoading}>
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </S.SubmitBtn>
          </S.Form>

          {/* Ссылка возврата на страницу входа */}
          <S.Footer>
            <span>Уже есть аккаунт?</span>
            <S.LinkBtn onClick={() => navigate("/login")} disabled={isLoading}>
              Войти здесь
            </S.LinkBtn>
          </S.Footer>
        </S.Card>
      </S.PageWrapper>
    </>
  );
};

export default RegisterPages;
