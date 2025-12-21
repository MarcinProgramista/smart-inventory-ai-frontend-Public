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
  const { items, fetchItems, total } = useFetchItems(showToast);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!auth?.id) return;

    fetchItems(auth.id, {
      page,
      limit,
      q: query,
    });
  }, [auth.id, page, query]);

  const openModal = () => setSearchParams({ add: "true" });
  const closeModal = () => setSearchParams({});

  const { addItem, editItem, deleteItem } = useItemActions({
    closeModal,
    showToast,
  });

  const handleSubmitItem = async (payload) => {
    await addItem(payload);
    await fetchItems(auth.id, { page, limit });
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
    await fetchItems(auth.id, { page, limit });
    closeEditModal();
    return result;
  };

  const handleDelete = async (id) => {
    await deleteItem(id, editingItem);
    await fetchItems(auth.id, { page, limit });
  };

  return (
    <>
      <ItemsList
        items={items}
        page={page}
        limit={limit}
        total={total}
        query={query}
        onQueryChange={(value) => {
          setPage(1); // ✅ TU JEST OK
          setQuery(value);
        }}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
        onAdd={openModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
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
