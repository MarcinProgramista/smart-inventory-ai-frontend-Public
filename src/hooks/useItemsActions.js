// src/hooks/useItemsActions.js
import axios from "axios";
import API_CONFIG from "../config/api";

export default function useItemActions({
  setItems,
  closeModal,
  closeEditModal,
  showToast,
}) {
  /* ADD ITEM */
  const addItem = async (itemData) => {
    try {
      const res = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}`,
        itemData,
        { withCredentials: true }
      );

      const fullItem = res.data.item;

      if (res.data.updated) {
        setItems((prev) =>
          prev.map((i) => (i.id === fullItem.id ? fullItem : i))
        );
      } else {
        setItems((prev) => [fullItem, ...prev]);
      }

      closeModal?.();
      showToast?.(
        res.data.updated ? "Quantity updated!" : "Item added!",
        "success"
      );

      return fullItem;
    } catch (error) {
      console.error("AddItem error:", error);
      throw error;
    }
  };

  /* EDIT ITEM */
  const editItem = async (id, updatedItem) => {
    try {
      const res = await axios.patch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}/${id}`,
        updatedItem,
        { withCredentials: true }
      );

      const fullItem = res.data.item;

      setItems((prev) =>
        prev.map((i) => (i.id === fullItem.id ? fullItem : i))
      );

      showToast?.("Item updated", "success");

      return fullItem;
    } catch (error) {
      // 🔴 TO JEST KLUCZ
      if (error.response?.status === 400 && error.response.data?.errors) {
        return {
          validationErrors: error.response.data.errors,
        };
      }

      // ❌ tylko PRAWDZIWE błędy
      console.error("EditItem error:", error);
      throw error;
    }
  };

  /* DELETE ITEM */
  const deleteItem = async (id, editingItem) => {
    try {
      await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}/${id}`,
        { withCredentials: true }
      );

      setItems((prev) => prev.filter((i) => i.id !== id));

      if (editingItem?.id === id) {
        closeEditModal?.();
      }

      showToast?.("Item deleted", "success");
    } catch (error) {
      console.error("DeleteItem error:", error);
      showToast?.("Failed to delete item", "error");
    }
  };

  return {
    addItem,
    editItem,
    deleteItem,
  };
}
