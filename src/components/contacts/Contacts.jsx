import { useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useFetchContacts from "../../hooks/useFetchContacts";
import { useContext, useEffect } from "react";
import ContactsList from "./ContactsList";
import ToastContext from "../../context/ToastContext";
import ContactDetails from "./ContactDetalis";
import useContactActions from "../../hooks/useContactActions";

export default function Contacts() {
  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { contacts, total, fetchContacts } = useFetchContacts();
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const limit = 8;
  const sortBy = searchParams.get("sort") ?? "last_name";
  const sortOrder = searchParams.get("order") ?? "asc";
  const { addContact, editContact, deleteContact } = useContactActions({
    showToast,
  });

  useEffect(() => {
    if (!auth?.id) return;

    fetchContacts(auth.id, {
      q: query,
      page,
      limit,
      sort: sortBy,
      order: sortOrder,
    });
  }, [auth?.id, query, page, sortBy, sortOrder]);

  const setQueryParams = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value) {
        next.set("q", value);
      } else next.delete("q");

      next.set("page", 1);
      return next;
    });
  };

  const setSortParams = (by, order) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", by);
      next.set("order", order);
      next.set("page", 1); // reset page
      return next;
    });
  };

  const handleAdd = async () => {
    await addContact({});
  };

  const handleEdit = async (contact) => {
    await editContact(contact.id, contact);
  };

  const handleDelete = async (contact) => {
    await deleteContact(contact);

    // 🔥 ODSWIEŻ LISTĘ
    fetchContacts(auth.id, {
      q: query,
      page,
      limit,
      sort: sortBy,
      order: sortOrder,
    });
  };

  const setPageParam = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", value);
      return next;
    });
  };

  return (
    <>
      <ContactsList
        contacts={contacts}
        query={query}
        page={page}
        limit={limit}
        total={total}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSortParams}
        onPrev={() => setPageParam(page - 1)}
        onNext={() => setPageParam(page + 1)}
        onQueryChange={setQueryParams}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
    </>
  );
}
