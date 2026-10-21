import styled from "styled-components";


// Обертка на весь экран для центрирования карточки
export const PageWrapper = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f4f5f7;
  display: flex;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  box-sizing: border-box;
`;

// Белая карточка формы
export const Card = styled.div`
  background-color: #ffffff;
  padding: 40px 32px;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
`;
// Логотип
export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

export const LogoIcon = styled.span`
  font-size: 22px;
`;

export const LogoText = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: #1a1a1a;
`;
// Заголовок "Вход"
export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 24px 0;
  text-align: center;
`;

// Форма и группы полей
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #6e6e6e;
`;

// Поле ввода (динамически меняет цвет при ошибке)
export const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${(props) => (props.$hasError ? "#e74c3c" : "#e0e0e0")};
  border-radius: 8px;
  font-size: 15px;
  color: #1a1a1a;
  background-color: ${(props) => (props.$hasError ? "#fff6f6" : "#fafafa")};
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    border-color: ${(props) => (props.$hasError ? "#e74c3c" : "#6c5ce7")};
    background-color: #ffffff;
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError ? "rgba(231, 76, 60, 0.1)" : "rgba(108, 92, 231, 0.1)"};
  }
`;
// Текст ошибки
export const ErrorMessage = styled.span`
  font-size: 13px;
  color: #e74c3c;
  font-weight: 500;
  margin-top: -4px;
`;

// Фиолетовая кнопка "Войти"
export const SubmitBtn = styled.button`
  width: 100%;
  height: 46px;
  background-color: #6c5ce7;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #5b4cc4;
  }

  &:active {
    background-color: #4a3db0;
  }
`;

// Текст снизу
export const Footer = styled.div`
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #6e6e6e;
`;
export const LinkBtn = styled.button`
  background: none;
  border: none;
  color: #6c5ce7;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;

  &:hover {
    text-decoration: underline;
  }
`;
