// --- IMPORTY ---
import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "../config/api";
import useAuth from "../hooks/useAuth";
import ItemsList from "../components/items/ItemsList";
import AddItemModal from "../components/items/AddItemModal";

import ToastContext from "../context/ToastContext";

// --- KOMPONENT Items ---
export default function Items() {
  const [items, setItems] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useContext(ToastContext);

  // Modal kontroluje WYŁĄCZNIE parametr w URL
  const drawerOpen = searchParams.get("add") === "true";

  // Pobieranie itemsów
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

  // Otwieranie/zamykanie modala
  const openModal = () => setSearchParams({ add: "true" });
  const closeModal = () =>
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.delete("add");
      return p;
    });

  // Obsługa dodania itemu
  const handleSubmitItem = async (itemData) => {
    try {
      const res = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}`,
        itemData,
        { withCredentials: true }
      );

      await fetchItems();
      closeModal();

      showToast(
        res.data.updated ? "Item exists — quantity increased!" : "Item added!",
        "success"
      );
    } catch (err) {
      console.error("Failed adding item:", err);
      showToast("Failed to save item", "error");
    }
  };

  // Usuwanie
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
    <>
      <ItemsList
        items={items}
        onDelete={handleDelete}
        onAdd={openModal}
        onResults={setItems}
      />

      <AddItemModal
        open={drawerOpen}
        onClose={closeModal}
        onSubmit={handleSubmitItem}
      />
    </>
  );
}
