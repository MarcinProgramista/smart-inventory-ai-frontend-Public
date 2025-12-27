import axios from "axios";
import { useState } from "react";
import API_CONFIG from "../config/api";

export default function useFetchContacts() {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchContacts = async (
    userId,
    { q = "", page = 1, limit = 10 } = {}
  ) => {
    const res = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS_SEARCH}`,
      {
        params: {
          user_id: userId,
          q,
          page,
          limit,
        },
        withCredentials: true,
      }
    );
    setContacts(res.data.items ?? []);
    setTotal(res.data.total ?? 0);
  };

  return {
    contacts,
    total,
    fetchContacts,
  };
}
