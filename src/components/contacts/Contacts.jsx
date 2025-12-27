import { useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useFetchContacts from "../../hooks/useFetchContacts";
import { useContext, useEffect } from "react";
import ContactsList from "./ContactsList";
import ToastContext from "../../context/ToastContext";

export default function Contacts() {
  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { contacts, fetchContacts } = useFetchContacts();
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const limit = 10;

  useEffect(() => {
    if (!auth?.id) return;

    fetchContacts(auth.id, {
      q: query,
      page,
      limit,
    });
  }, [auth?.id, query, page]);

  const setQueryParams = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set("q", value);
      else next.delete("q");

      next.set("page", 1);
      return next;
    });
  };
  const handleEdite = async (contact) => {
    showToast(
      <>
        <div>Edited: </div>
        <div>id: {contact.id}</div>
        <div>
          {contact.first_name} {contact.last_name}{" "}
        </div>
        <div>{contact.email}</div>
        <div>{contact.mobile_phone}</div>
        <div>{contact.role}</div>
      </>
    );
  };
  const handleDelete = async (contact) => {
    showToast(
      <>
        <div>Deleted: </div>
        <div>id: {contact.id}</div>
        <div>
          {contact.first_name} {contact.last_name}{" "}
        </div>
        <div>{contact.email}</div>
        <div>{contact.mobile_phone}</div>
        <div>{contact.role}</div>
      </>,
      "error"
    );
  };
  return (
    <>
      <ContactsList
        contacts={contacts}
        query={query}
        onQueryChange={setQueryParams}
        onDelete={handleDelete}
        onEdit={handleEdite}
      />
    </>
  );
}
