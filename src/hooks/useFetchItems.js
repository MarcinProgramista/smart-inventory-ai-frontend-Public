import { useState } from "react";
import axios from "axios";
import API_CONFIG from "../config/api";

export default function useFetchItems(showThoast) {
  const [items, setItems] = useState([]);

  const fetchItems = async (userId) => {
    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}?user_id=${userId}`,
        { withCredentials: true }
      );
      setItems(res.data);
    } catch (error) {
      console.log("Fetch items error:", error);
      showThoast?.("Faliled loading items", "errorS");
    }
  };

  return {
    items,
    setItems,
    fetchItems,
  };
}
