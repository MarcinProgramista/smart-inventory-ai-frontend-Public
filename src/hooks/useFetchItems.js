import axios from "axios";
import API_CONFIG from "../config/api";
import { useState } from "react";

export default function useFetchItems(showToast) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchItems = async (userId, { page = 1, limit = 10 } = {}) => {
    console.log("FETCH ITEMS", { page, limit }); // 👈 KROK 1

    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS_SEARCH}`,

        {
          params: {
            user_id: userId,
            page,
            limit,
          },
          withCredentials: true,
        }
      );

      setItems(res.data.items ?? []);
      setTotal(res.data.total ?? 0);

      console.log("FETCH ITEMS RESULT", {
        itemsCount: res.data.items?.length,
        total: res.data.total,
      });
    } catch (error) {
      console.log("Fetch items error:", error);
      showToast?.("Failed loading items", "error");
    }
  };

  return {
    items,
    setItems,
    fetchItems,
  };
}
