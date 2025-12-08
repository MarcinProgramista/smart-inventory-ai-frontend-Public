import { useEffect, useState } from "react";
import axios from "axios";
import API_CONFIG from "../config/api";
import ItemsList from "../components/items/ItemsList";
import ItemsSearchBar from "../components/items/ItemsSearchBar";

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.ITEMS}`,
        { withCredentials: true }
      );
      setItems(response.data);
    } catch (error) {
      console.error("Failed to load items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <h2 style={{ color: "#9deaff" }}>Loading items...</h2>;

  return (
    <div style={{ padding: "2rem", color: "#9deaff" }}>
      <h1>Items</h1>
      <ItemsSearchBar onResults={setItems} />
      <ItemsList items={items} />
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onCreated={fetchItems}
        />
      )}
    </div>
  );
}
