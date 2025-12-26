import { useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useFetchContacts from "../../hooks/useFetchContacts";
import { useEffect } from "react";

export default function Contacts() {
  const { auth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { contacts, fetchContacts } = useFetchContacts();
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    if (!auth.id) return;
    fetchContacts(auth.id, { q: query });
  }, [auth?.id, query]);
  return (
    <>
      <input
        value={query}
        onChange={(e) =>
          setSearchParams(e.target.value ? { q: e.target.value } : {})
        }
        placeholder="Search contacts...."
      />
      <pre>{JSON.stringify(contacts, null, 2)}</pre>
    </>
  );
}
