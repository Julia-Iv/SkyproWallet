import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./LoginPages.styled";

const LoginPages= () => {
  const navigate = useNavigate();

  // Состояния для полей формы
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Состояние ошибки (для демонстрации валидации, как на макете)
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Простейшая проверка на заполненность
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    setError("");
    console.log("Данные формы:", { email, password });

    // Имитация успешного входа и переход в личный кабинет
    navigate("/expenses");
  };

  return (
    <S.PageWrapper>
      <S.Card>
        {/* Логотип над формой */}
        <S.Logo>
          <S.LogoIcon>🪙</S.LogoIcon>
          <S.LogoText>Skypro.Wallet</S.LogoText>
        </S.Logo>

        <S.Title>Вход</S.Title>

        <S.Form onSubmit={handleSubmit}>
          {/* Поле Email */}
          <S.InputGroup>
            <S.Label>Email</S.Label>
            <S.Input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              $hasError={!!error} // передаем true/false для подсветки ошибки
            />
          </S.InputGroup>
          {/* Поле Пароль */}
          <S.InputGroup>
            <S.Label>Пароль</S.Label>
            <S.Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              $hasError={!!error}
            />
          </S.InputGroup>

          {/* Блок вывода ошибки (если она есть) */}
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          {/* Кнопка отправки формы */}
          <S.SubmitBtn type="submit">Войти</S.SubmitBtn>
        </S.Form>

        {/* Ссылка на регистрацию */}
        <S.Footer>
          <span>Впервые у нас? </span>
          <S.LinkBtn onClick={() => navigate("/register")}>
            Регистрация
          </S.LinkBtn>
        </S.Footer>
      </S.Card>
    </S.PageWrapper>
  );
};

export default LoginPages;
