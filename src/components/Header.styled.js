import styled from "styled-components";

// Контейнер шапки на всю ширину
export const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #eef0f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-sizing: border-box;
  position: fixed; /* Фиксируем шапку наверху экрана */
  top: 0;
  left: 0;
  z-index: 100;
`;

// Левая часть: Логотип
export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const LogoIcon = styled.span`
  font-size: 20px;
`;

export const LogoText = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #1a1a1a;
  font-family: system-ui, -apple-system, sans-serif;
`;

// Правая часть: Блок пользователя / Действия
export const UserBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6e6e6e;
  font-family: system-ui, -apple-system, sans-serif;
`;

export const LogoutBtn = styled.button`
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: #6e6e6e;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: system-ui, -apple-system, sans-serif;

  &:hover {
    background-color: #fafafa;
    border-color: #6c5ce7;
    color: #6c5ce7;
  }
`;