import axios from "axios";
import API_CONFIG from "../config/api";

export default function useContactActions({ showToast }) {
  const addContact = async (payload) => {
    await axios.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}`,
      payload,
      { withCredentials: true }
    );

    showToast("Contact added");
  };

  const editContact = async (id, payload) => {
    await axios.put(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}/${id}`,
      payload,
      { withCredentials: true }
    );

    showToast("Contact updated");
  };

  const deleteContact = async (contact) => {
    await axios.delete(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}/${contact.id}`,
      { withCredentials: true }
    );

    showToast(
      <>
        <div>Deleted contact</div>
        <div>
          {contact.first_name} {contact.last_name}
        </div>
      </>,
      "error"
    );
  };

  return {
    addContact,
    editContact,
    deleteContact,
  };
}
