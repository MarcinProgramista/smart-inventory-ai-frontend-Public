import axios from "axios";
import API_CONFIG from "../config/api";
import { useState } from "react";

export default function useFetchContacts(showToast) {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async (userId) => {
    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}?user_id=${userId}`,
        { withCredentials: true }
      );
      setContacts(res.data);
    } catch (error) {
      console.log("Fetch contacts error:", error);
      showToast?.("Failed to load contacts", "error");
    }
  };
  return {
    contacts,
    setContacts,
    fetchContacts,
  };
}
