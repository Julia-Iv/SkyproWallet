import { Routes, Route } from "react-router-dom";
import LoginPages from "../pages/LoginPages"; 
import RegisterPages from "../pages/RegisterPages";
import ExpensesPages from "../pages/ExpensesPages";
import AnalysisPage from "../pages/AnalysisPage"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ExpensesPages />} />
      <Route path="/expenses" element={<ExpensesPages />} />
      <Route path="/" element={<LoginPages />} />
      <Route path="/login" element={<LoginPages />} />
      <Route path="/register" element={<RegisterPages />} />
      <Route path="/analysis" element={<AnalysisPage />}/>
    </Routes>
  );
}

export default AppRoutes;
