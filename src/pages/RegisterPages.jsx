import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./RegisterPages.styled"; // Переиспользуем готовые стили карточки и шапки

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Сброс старых ошибок
    setNameError("");
    setEmailError("");
    setPasswordError("");

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

    console.log("Данные регистрации:", { name, email, password });
    
    // После успешной регистрации имитируем вход и перенаправляем на расходы
    navigate("/expenses");
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
              />
              {passwordError && <S.ErrorMessage>{passwordError}</S.ErrorMessage>}
            </S.InputGroup>

            {/* Кнопка регистрации */}
            <S.SubmitBtn type="submit">Зарегистрироваться</S.SubmitBtn>
          </S.Form>

          {/* Ссылка возврата на страницу входа */}
          <S.Footer>
            <span>Уже есть аккаунт?</span>
            <S.LinkBtn onClick={() => navigate("/login")}>
              Войти здесь
            </S.LinkBtn>
          </S.Footer>
        </S.Card>
      </S.PageWrapper>
    </>
  );
};

export default RegisterPages;