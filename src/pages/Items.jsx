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

  const { items, setItems, fetchItems } = useFetchItems(showToast);

  useEffect(() => {
    fetchItems(auth.id);
  }, [auth.id]);

  const openModal = () => setSearchParams({ add: "true" });
  const closeModal = () => setSearchParams({});

  const { addItem, editItem, deleteItem } = useItemActions({
    setItems,
    closeModal,
    showToast,
  });

  const handleSubmitItem = (payload) => addItem(payload);

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

  const handleDelete = async (id) => deleteItem(id, editingItem);
  return (
    <>
      <ItemsList
        items={items}
        onDelete={handleDelete}
        onAdd={openModal}
        onResults={setItems}
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
