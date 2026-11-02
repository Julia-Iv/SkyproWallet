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

export const LogoIconSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background-color: #000000;
  border-radius: 6px;
  color: #ffffff;
  margin-left: 150px;
`;

export const LogoText = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #1a1a1a;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
`;
// --- ЦЕНТРАЛЬНАЯ ЧАСТЬ: НАВИГАЦИЯ ---
export const Nav = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const MenuLink = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  text-decoration: none;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    color: #7334ea;
    font-weight: 600;
    border-bottom-color: #7334ea;
  }

  /* Класс active автоматически вешается компонентом NavLink из react-router-dom */
  &.active {
    color: #7334ea;
    font-weight: 600;
    border-bottom-color: #7334ea;
  }
`;

// Правая часть: пользователь
export const UserBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6e6e6e;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
`;

export const LogoutBtn = styled.button`
  background: none;
  border: none;
  padding: 6px 0;
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  padding-right: 150px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;

  &:hover {
    color: #7334ea;
  }
`;
