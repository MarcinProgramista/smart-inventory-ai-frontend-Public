import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ContactList from "../components/contacts/ContactList";
import useFetchContacts from "../hooks/useFetchContacts";

export default function Contacts() {
  const { auth } = useAuth();
  const { contacts, setContacts, fetchContacts } = useFetchContacts();

  useEffect(() => {
    if (auth?.id) {
      fetchContacts(auth.id);
    }
  }, [auth?.id]);

  return (
    <ContactList
      contacts={contacts}
      onResult={setContacts} // ✅ FUNKCJA
      userId={auth?.id} // ✅ ID
    />
  );
}
