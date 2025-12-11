// --- IMPORTY ---
import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "../config/api";
import useAuth from "../hooks/useAuth";
import ItemsList from "../components/items/ItemsList";
import AddItemModal from "../components/items/AddItemModal";

import ToastContext from "../context/ToastContext";
import EditItemModal from "../components/items/EditItemModal";

// --- KOMPONENT Items ---
export default function Items() {
  const [items, setItems] = useState([]);
  const { auth } = useAuth();
  const [editingItem, setEditingItem] = useState(null);

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
  const openEditModal = (item) => setEditingItem(item);
  const closeEditModal = () => setEditingItem(null);

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

  const handleEditSubmit = async (e, updatedItem) => {
    e.preventDefault();

    try {
      await axios.patch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}/${editingItem.id}`,
        updatedItem,
        { withCredentials: true }
      );

      await fetchItems();
      closeEditModal();

      showToast("Item updated", "success");
    } catch (err) {
      console.error("Failed updating item:", err);
      showToast("Failed to update item", "error");
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
        onEdit={openEditModal} // ➜ NOWE
      />

      <AddItemModal
        open={drawerOpen}
        onClose={closeModal}
        onSubmit={handleSubmitItem}
      />
      <EditItemModal
        open={!!editingItem}
        item={editingItem}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
      />
    </>
  );
}
