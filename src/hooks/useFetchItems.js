import axios from "axios";
import API_CONFIG from "../config/api";
import { useState } from "react";

// useFetchItems.js
export default function useFetchItems(showToast) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchItems = async (userId, { page = 1, limit = 20, q = "" } = {}) => {
    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS_SEARCH}`,
        {
          params: { user_id: userId, page, limit, q },
          withCredentials: true,
        }
      );

      setItems(res.data.items ?? []);
      setTotal(res.data.total ?? 0);
    } catch (err) {
      console.error("Fetch items error:", err);
      showToast?.("Failed to load items", "error");
    }
  };

  return { items, total, fetchItems };
}
