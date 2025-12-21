// Items.jsx
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
  const [editingItem, setEditingItem] = useState(null);
  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const drawerOpen = searchParams.get("add") === "true";
  const { items, total, setItems, fetchItems } = useFetchItems(showToast);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!auth?.id) return;
    fetchItems(auth.id, { page, limit, q: query });
  }, [auth.id, page, limit, query]);

  const openModal = () => setSearchParams({ add: "true" });
  const closeModal = () => setSearchParams({});

  const { addItem, editItem, deleteItem } = useItemActions({
    setItems,
    closeModal,
    showToast,
  });
  const handleQueryChange = (q) => {
    setPage(1);
    setQuery(q);
  };
  const handleSubmitItem = async (payload) => {
    const result = await addItem(payload);

    // 🔥 KLUCZOWE
    await fetchItems(auth.id, { page, limit });

    return result;
  };

  function openEditModal(item) {
    return setEditingItem({ ...item });
  }
  const closeEditModal = () => setEditingItem(null);

  const handleEditSubmit = async (updatedItem) => {
    const result = await editItem(editingItem.id, updatedItem);

    if (result?.validationErrors) {
      return result;
    }

    closeEditModal();
    return result;
  };

  const handleDelete = async (id) => {
    await deleteItem(id, editingItem);

    // 🔥 ZAWSZE odśwież
    await fetchItems(auth.id, { page, limit });
  };

  return (
    <>
      <ItemsList
        items={items}
        page={page}
        limit={limit}
        total={total}
        onQueryChange={handleQueryChange}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
        onDelete={handleDelete}
        onAdd={openModal}
        onEdit={openEditModal}
      />

      <AddItemModal
        open={drawerOpen}
        onClose={closeModal}
        onSubmit={handleSubmitItem}
      />

      <EditItemModal
        open={!!editingItem}
        item={editingItem}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
      />
    </>
  );
}
