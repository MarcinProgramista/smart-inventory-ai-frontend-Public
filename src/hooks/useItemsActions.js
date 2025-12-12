import axios from "axios";
import API_CONFIG from "../config/api";

export default function useItemActions({ setItems, closeModal, showToast }) {
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
      (showToast?.(res.data.updated ? "Quantity updated!" : "Item added!"),
        "success");
      return fullItem;
    } catch (error) {
      console.log("AddItem error:", error);
      throw error;
    }
  };

  return {
    addItem,
  };
}
