import { useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ContactList from "../components/contacts/ContactList";
import ToastContext from "../context/ToastContext";
import axios from "axios";
import API_CONFIG from "../config/api";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2rem;
  align-items: start;
`;

const LeftColumn = styled.div`
  padding: 1rem;
  background: rgba(0, 40, 70, 0.4);
  border-radius: 12px;
  color: #9deaff;
`;

export default function Contacts() {
  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await axios.get(`${API_CONFIG.BASE_URL}/api/contacts`, {
        params: { user_id: auth?.id },
        withCredentials: true,
      });

      setContacts(res.data);
    };

    if (auth?.id) {
      fetchContacts();
    }
  }, [auth?.id]);

  return (
    <Layout>
      {/* 🟦 LEWA KOLUMNA – FILTRY (PLACEHOLDER) */}
      <LeftColumn>
        <h4>Filters</h4>
        <p>🔧 Tu będą filtry</p>
      </LeftColumn>

      {/* 🟩 PRAWA KOLUMNA – LISTA + SEARCH */}
      <ContactList
        contacts={contacts}
        onResult={setContacts}
        userId={auth?.id}
      />
    </Layout>
  );
}
