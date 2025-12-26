import axios from "axios";
import { useState } from "react";
import API_CONFIG from "../config/api";

export default function useFetchContacts() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async (userId, { q = "" } = {}) => {
    const res = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS_SEARCH}`,
      {
        params: {
          userId: userId,
          q,
        },
        withCredentials: true,
      }
    );
    setContacts(res.data.items ?? []);
  };

  return {
    contacts,
    fetchContacts,
  };
}
