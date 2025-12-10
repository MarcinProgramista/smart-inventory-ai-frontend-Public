// pages/Items.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "../config/api";
import useAuth from "../hooks/useAuth";
import ItemsSearchBar from "../components/items/ItemsSearchBar";
import ItemsList from "../components/items/ItemsList";
import AddItemModal from "../components/items/AddItemModal";
import ToastContext from "../context/ToastContext";

export default function Items() {
  const [items, setItems] = useState([]);
  const { auth } = useAuth();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useContext(ToastContext);

  // 🔥 drawerOpen zależy TYLKO od URL
  const drawerOpen = searchParams.get("add") === "true";

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}?user_id=${auth.id}`,
        { withCredentials: true }
      );
      setItems(res.data);
    } catch (err) {
      console.error("Failed fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 🔥 usuń parametr add=true
  const clearAddParam = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.delete("add");
      return p;
    });
  };

  // 🔥 otwieramy modal – TYLKO zmieniając URL
  const handleOpen = () => {
    setSearchParams({ add: "true" });
  };

  // 🔥 zamykamy modal – TYLKO zmieniając URL
  const handleClose = () => {
    clearAddParam();
  };

  const handleSubmitItem = async (itemData) => {
    try {
      const res = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}`,
        itemData,
        { withCredentials: true }
      );

      await fetchItems();
      clearAddParam();

      showToast(
        res.data.updated ? "Item exists — quantity increased!" : "Item added!",
        "success"
      );
    } catch (err) {
      console.error("Failed adding item:", err);
      showToast("Failed to save item", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}/${id}`,
        { withCredentials: true }
      );
      setItems((prev) => prev.filter((i) => i.id !== id));
      showToast("Item deleted", "success");
    } catch (err) {
      console.error("Failed delete:", err);
      showToast("Failed to delete item", "error");
    }
  };

  return (
    <div style={{ padding: "2rem", color: "#9deaff", width: "100%" }}>
      <h1>Items</h1>

      <button
        onClick={() => navigate("/home")}
        className="btn btn-secondary mb-3"
      >
        ← Back
      </button>

      <button className="btn btn-info mb-4" onClick={handleOpen}>
        ➕ Add Item
      </button>

      <ItemsSearchBar onResults={setItems} />
      <ItemsList items={items} onDelete={handleDelete} />

      {/* modal otwiera się wyłącznie gdy ?add=true */}
      <AddItemModal
        open={drawerOpen}
        onClose={handleClose}
        onSubmit={handleSubmitItem}
      />
    </div>
  );
}
