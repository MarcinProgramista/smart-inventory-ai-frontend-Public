// src/hooks/useLoader.js
import { useContext } from "react";
import { LoaderContext } from "../context/LoaderContext";

export default function useLoader() {
  return useContext(LoaderContext);
}
