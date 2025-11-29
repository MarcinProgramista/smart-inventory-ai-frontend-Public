import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Register from "./pages/Register";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import RouteLoader from "./components/layout/RouteLoader";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouteLoader />
      <Layout />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
