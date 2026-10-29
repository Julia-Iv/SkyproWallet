import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f4f5f7;
  font-family: "Inter", sans-serif;
  color: #1f2937;
`;

 export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #eef0f2;
  z-index: 100;
  box-sizing: border-box;
  
  /* Внутренний контейнер для центрирования элементов хедера */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc((100% - 1200px) / 2 + 24px); 

  @media (max-width: 1248px) {
    padding: 0 24px;
  }
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
  color: #1e1b4b;

  span {
    padding: 6px;
    background-color: #6366f1;
    border-radius: 6px;
    color: #ffffff;
    font-size: 10px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 24px;
`;

export const NavLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  padding-bottom: 4px;
  color: ${(props) => (props.$active ? "#6366f1" : "#6b7280")};
  border: 2px solid ${(props) => (props.$active ? "#6366f1" : "transparent")};
  transition: color 0.2s;

  &:hover {
    color: #6366f1;
  }
`;

export const LogoutButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #6366f1;
  }
`;

export const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 90px 24px 24px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #111827;
  text-align: left;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
`;

export const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #111827;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: left;
`;

export const Th = styled.th`
  color: #9ca3af;
  font-weight: 500;
  padding-bottom: 12px;
  border: 1px solid #f3f4f6;
`;

export const Td = styled.td`
  padding: 14px 0;
  border: 1px solid #f9fafb;
  color: ${(props) => props.$color || "#111827"};
  font-weight: ${(props) => (props.$bold ? "600" : "400")};
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.2s;

  &:hover {
    color: #ef4444;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1;
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  font-size: 12px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f9fafb;
    border-color: #6366f1;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #6366f1;
  color: #ffffff;
  font-weight: 500;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;

  &:hover {
    background-color: #4f46e5;
  }
`;
