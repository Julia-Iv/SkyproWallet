import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./LoginPages.styled";

const LoginPages = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    setError("");
    console.log("Данные формы:", { email, password });
    navigate("/expenses");
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
