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
  const [filters, setFilters] = useState({
    q: "",
    role: "",
    page: 1,
    limit: 20,
  });
  useEffect(() => {
    const fetchContacts = async () => {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}/api/contacts/search`,
        {
          params: {
            q: filters.q,
            role: filters.role,
            page: filters.page,
            limit: filters.limit,
            user_id: auth?.id,
          },
          withCredentials: true,
        }
      );

      setContacts(res.data.items || []);
    };

    if (auth?.id) {
      fetchContacts();
    }
  }, [auth?.id, filters]);

  console.log("contacts is array?", Array.isArray(contacts), contacts);

  return (
    <Layout>
      {/* 🟦 LEWA KOLUMNA – FILTRY (PLACEHOLDER) */}
      <LeftColumn>
        <h4>Filters</h4>
        <pre>{JSON.stringify(filters, null, 2)}</pre>
      </LeftColumn>

      {/* 🟩 PRAWA KOLUMNA – LISTA + SEARCH */}
      <ContactList
        contacts={contacts}
        filters={filters}
        setFilters={setFilters}
        userId={auth?.id}
      />
    </Layout>
  );
}
