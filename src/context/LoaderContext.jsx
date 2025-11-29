// src/context/LoaderContext.jsx
import { createContext, useState } from "react";
import NeonLoader from "../components/ui/NeonLoader";

export const LoaderContext = createContext();

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <NeonLoader />}
    </LoaderContext.Provider>
  );
}
