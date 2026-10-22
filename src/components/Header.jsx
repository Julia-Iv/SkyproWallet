import { useNavigate } from "react-router-dom";
import * as S from "./Header.styled";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Здесь будет логика очистки токена/авторизации
    console.log("Выход из системы");
    navigate("/login");
  };

  return (
    <S.HeaderContainer>
      <S.Logo onClick={() => navigate("/expenses")}>
        {/* Фирменная SVG-иконка вместо старого смайлика */}
        <S.LogoIconSvg>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </S.LogoIconSvg>
        <S.LogoText>Skypro.Wallet</S.LogoText>
      </S.Logo>

      <S.UserBlock>
        <S.UserName>user@mail.com</S.UserName>
        <S.LogoutBtn onClick={handleLogout}>Выйти</S.LogoutBtn>
      </S.UserBlock>
    </S.HeaderContainer>
  );
};

export default Header;