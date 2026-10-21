import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPages from './pages/LoginPages';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;