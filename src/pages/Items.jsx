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
import useFetchItems from "../hooks/useFetchItems";
import useItemActions from "../hooks/useItemsActions";

export default function Items() {
  const [editingItem, setEditingItem] = useState(null);

  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const drawerOpen = searchParams.get("add") === "true";

  /* ---------------------------------------------------
     FETCH ITEMS
  --------------------------------------------------- */
  const { items, setItems, fetchItems } = useFetchItems(showToast);

  useEffect(() => {
    fetchItems(auth.id);
  }, [auth.id]);

  /* ---------------------------------------------------
     ADD MODAL
  --------------------------------------------------- */
  const openModal = () => setSearchParams({ add: "true" });
  const closeModal = () => setSearchParams({});

  const { addItem } = useItemActions({
    setItems,
    closeModal,
    showToast,
  });
  /* ---------------------------------------------------
      REALNE SUBMIT Z MODALA
  --------------------------------------------------- */
  const handleSubmitItem = (payload) => addItem(payload);

  /* ---------------------------------------------------
     EDIT MODAL
  --------------------------------------------------- */
  function openEditModal(item) {
    return setEditingItem({ ...item });
  }
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

      await fetchItems(auth.id);
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
