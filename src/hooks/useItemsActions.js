// src/hooks/useItemsActions.js
import axios from "axios";
import API_CONFIG from "../config/api";

export default function useItemActions({ closeModal, showToast }) {
  const addItem = async (payload) => {
    try {
      const res = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}`,
        payload,
        { withCredentials: true }
      );

      closeModal();
      return res.data;
    } catch (err) {
      console.error("AddItem error:", err);
      showToast?.("Failed to add item", "error");
      throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}/${id}`,
        { withCredentials: true }
      );
    } catch (err) {
      console.error("DeleteItem error:", err);
      showToast?.("Failed to delete item", "error");
      throw err;
    }
  };

  const editItem = async (id, payload) => {
    try {
      const res = await axios.patch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}/${id}`,
        payload,
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      console.error("EditItem error:", err);
      showToast?.("Failed to edit item", "error");
      throw err;
    }
  };

  return { addItem, deleteItem, editItem };
}
