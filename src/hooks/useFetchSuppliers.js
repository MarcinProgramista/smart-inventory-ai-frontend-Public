import { useState } from "react";
import axios from "../api/axios";

export default function useFetchSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async (userId, params = {}) => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get("/api/suppliers/search", {
        params: {
          user_id: userId,
          ...params,
        },
      });
      setSuppliers(res.data.items || []);
      setTotal(res.data.total || 0);
    } finally {
      setLoading(false);
    }
  };
  return {
    suppliers,
    total,
    loading,
    fetchSuppliers,
  };
}
