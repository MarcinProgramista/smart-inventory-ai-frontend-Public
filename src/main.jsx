// main.jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import LoaderProvider from "./context/LoaderContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </AuthProvider>
  </BrowserRouter>
);
