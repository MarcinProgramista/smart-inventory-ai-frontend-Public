// Items.jsx
import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "../config/api";

import useAuth from "../hooks/useAuth";
import ItemsList from "../components/items/ItemsList";
import AddItemModal from "../components/items/AddItemModal";
import EditItemModal from "../components/items/EditItemModal";

import ToastContext from "../context/ToastContext";

export default function Items() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const drawerOpen = searchParams.get("add") === "true";

  /* ---------------------------------------------------
     FETCH ITEMS
  --------------------------------------------------- */
  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}?user_id=${auth.id}`,
        { withCredentials: true }
      );
      setItems(res.data);
    } catch (err) {
      console.error("Fetch items error:", err);
      showToast("Failed loading items", "error");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ---------------------------------------------------
     ADD MODAL
  --------------------------------------------------- */
  const openModal = () => setSearchParams({ add: "true" });
  const closeModal = () => setSearchParams({});

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
        res.data.updated ? "Quantity updated!" : "Item added!",
        "success"
      );
    } catch (err) {
      console.error("Add error:", err);
      throw err; // <-- WAŻNE: pozwalamy AddItemModal pokazać błędy pod inputami
    }
  };

  /* ---------------------------------------------------
     EDIT MODAL
  --------------------------------------------------- */
  const openEditModal = (item) => setEditingItem({ ...item });
  const closeEditModal = () => setEditingItem(null);

  const handleEditSubmit = async (e, updatedItem) => {
    e.preventDefault();
    if (!editingItem) return;

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
      console.error("Edit error:", err);
      throw err;
      // 🔥 WAŻNE: EditItemModal musi przejąć błąd i wyświetlić go pod inputem
    }
  };

  /* ---------------------------------------------------
     DELETE ITEM
  --------------------------------------------------- */
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}/${id}`,
        { withCredentials: true }
      );

      setItems((prev) => prev.filter((i) => i.id !== id));

      if (editingItem?.id === id) closeEditModal();

      showToast("Item deleted", "success");
    } catch (err) {
      console.error("Delete failed:", err);
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
        onEdit={openEditModal}
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
