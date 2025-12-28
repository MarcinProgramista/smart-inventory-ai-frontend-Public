import axios from "axios";
import API_CONFIG from "../config/api";

export default function useContactActions({ showToast }) {
  const addContact = async (payload) => {
    try {
      await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}`,
        payload,
        { withCredentials: true }
      );

      showToast("Contact added");
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to add contact";

      showToast(message, "error");
      throw error; // 🔥 ważne
    }
  };

  const updateContact = async (id, payload) => {
    try {
      await axios.put(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}/${id}`,
        payload,
        { withCredentials: true }
      );

      showToast("Contact updated");
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update contact";

      showToast(message, "error");
      throw error; // 🔥 ważne
    }
  };

  const deleteContact = async (contact) => {
    try {
      await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}/${contact.id}`,
        { withCredentials: true }
      );

      showToast(
        `Deleted contact: ${contact.first_name} ${contact.last_name}`,
        "error"
      );
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update contact";

      showToast(message, "error");
      throw error; // 🔥 ważne
    }
  };

  return {
    addContact,
    updateContact,
    deleteContact,
  };
}
