import { useEffect, useState } from "react";
import ItemsList from "../components/items/ItemsList";
import API_CONFIG from "../config/api";
import axios from "axios";

export default function Items() {
  const [items, setItems] = useState([]);

  // Pobieranie itemów z backendu
  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.ITEMS}`
      );
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: "2rem", color: "#9deaff" }}>
      <h1>Items</h1>
      <ItemsList items={items} />
    </div>
  );
}
