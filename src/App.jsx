import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPages from "./pages/LoginPages";
import RegisterPages from "./pages/RegisterPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPages />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/register" element={<RegisterPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
