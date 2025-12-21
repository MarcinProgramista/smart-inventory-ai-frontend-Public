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
  const [categoryId, setCategoryId] = useState("");

  const drawerOpen = searchParams.get("add") === "true";

  const openModal = () => setSearchParams({ add: "true" });
  const closeModal = () => setSearchParams({});

  const { addItem, editItem, deleteItem } = useItemActions({
    closeModal,
    showToast,
  });

  useEffect(() => {
    if (!auth?.id) return;

    fetchItems(auth.id, {
      page,
      limit,
      q: query,
      categoryId,
    });
  }, [auth?.id, page, query, categoryId]);

  const openEditModal = (item) => setEditingItem(item);

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems(auth.id, { page, limit, q: query, categoryId });
  };

  const handleQueryChange = (v) => {
    setPage(1);
    setQuery(v);
  };

  const handleCategoryChange = (id) => {
    setPage(1);
    setCategoryId(id);
  };

  return (
    <>
      <ItemsList
        items={items}
        page={page}
        limit={limit}
        total={total}
        query={query}
        categoryId={categoryId}
        onQueryChange={handleQueryChange}
        onCategoryChange={handleCategoryChange}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
        onAdd={openModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <AddItemModal
        open={drawerOpen}
        onClose={closeModal}
        onSubmit={async (payload) => {
          await addItem(payload);
          fetchItems(auth.id, { page, limit, q: query, categoryId });
        }}
      />

      <EditItemModal
        open={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSubmit={async (payload) => {
          await editItem(editingItem.id, payload);
          setEditingItem(null);
          fetchItems(auth.id, { page, limit, q: query, categoryId });
        }}
      />
    </>
  );
}
