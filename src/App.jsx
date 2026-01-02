import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Register from "./pages/Register";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import RouteLoader from "./components/layout/RouteLoader";
import Home from "./pages/Home";
import RequireAuth from "./hooks/RequireAuth";
import Items from "./pages/Items";

import { ToastProvider } from "./context/ToastContext";
import Contacts from "./components/contacts/Contacts";
import Suppliers from "./components/suppliers/Suppliers";

function App() {
  return (
    <>
      <ToastProvider>
        <GlobalStyle />
        <RouteLoader />

        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/suppliers" element={<Suppliers />} />
          </Route>
        </Routes>
      </ToastProvider>
    </>
  );
}

export default App;
