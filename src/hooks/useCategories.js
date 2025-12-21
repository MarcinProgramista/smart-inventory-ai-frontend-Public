import axios from "axios";
import API_CONFIG from "../config/api";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export default function useCategories() {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;

    axios
      .get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORIES}`, {
        params: { user_id: auth.id }, // 🔥 KLUCZ
        withCredentials: true,
      })
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error("Categories error:", err);
      });
  }, [auth?.id]);

  return categories;
}
