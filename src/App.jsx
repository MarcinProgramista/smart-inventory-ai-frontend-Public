import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Register from "./pages/Register";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
