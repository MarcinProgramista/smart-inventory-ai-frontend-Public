import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ItemsList from "../components/items/ItemsList";
import AddItemModal from "../components/items/AddItemModal";
import EditItemModal from "../components/items/EditItemModal";
import ToastContext from "../context/ToastContext";
import useFetchItems from "../hooks/useFetchItems";
import useItemActions from "../hooks/useItemsActions";

export default function Items() {
  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);
  const [editingItem, setEditingItem] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { items, total, fetchItems } = useFetchItems(showToast);

  const [page, setPage] = useState(1);
  const limit = 5;
  const [query, setQuery] = useState("");

  const drawerOpen = searchParams.get("add") === "true";

  useEffect(() => {
    if (!auth?.id) return;
    fetchItems(auth.id, { page, limit, q: query });
  }, [auth.id, page, query]);

  const { addItem, editItem, deleteItem } = useItemActions({
    closeModal: () => setSearchParams({}),
    showToast,
  });

  return (
    <>
      <ItemsList
        items={items}
        page={page}
        limit={limit}
        total={total}
        query={query}
        onQueryChange={(v) => {
          setPage(1);
          setQuery(v);
        }}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
        onAdd={() => setSearchParams({ add: "true" })}
        onEdit={setEditingItem}
        onDelete={async (id) => {
          await deleteItem(id);
          fetchItems(auth.id, { page, limit, q: query });
        }}
      />

      <AddItemModal
        open={drawerOpen}
        onClose={() => setSearchParams({})}
        onSubmit={async (p) => {
          await addItem(p);
          fetchItems(auth.id, { page, limit, q: query });
        }}
      />

      <EditItemModal
        open={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSubmit={async (p) => {
          await editItem(editingItem.id, p);
          setEditingItem(null);
          fetchItems(auth.id, { page, limit, q: query });
        }}
      />
    </>
  );
}
