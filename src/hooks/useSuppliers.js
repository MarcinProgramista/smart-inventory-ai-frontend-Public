import axios from "axios";
import API_CONFIG from "../config/api";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export default function useSuppliers() {
  const { auth } = useAuth();
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;

    axios
      .get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUPPLIERS}`, {
        params: { user_id: auth.id },
        withCredentials: true,
      })
      .then((res) => setSuppliers(res.data))
      .catch((err) => {
        console.error("Suppliers error:", err);
      });
  }, [auth?.id]);
  return suppliers;
}
