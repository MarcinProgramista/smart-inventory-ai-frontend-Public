import { useEffect, useContext, useState } from "react";
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
  const limit = 5;

  // ===============================
  // URL helpers
  // ===============================
  const getParam = (key, def = "") => searchParams.get(key) ?? def;

  const setParam = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value === "" || value == null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }

      next.set("page", 1);
      return next;
    });
  };

  // ===============================
  // Params from URL
  // ===============================
  const query = getParam("q");
  const categoryId = getParam("category");
  const supplierId = getParam("supplier");
  const stock = getParam("stock");
  const sort = getParam("sort", "name");
  const order = getParam("order", "asc");
  const page = Number(getParam("page", 1));

  const drawerOpen = searchParams.get("add") === "true";

  const openModal = () => setSearchParams({ add: "true" });
  const closeModal = () => setSearchParams({});

  const { addItem, editItem, deleteItem } = useItemActions({
    closeModal,
    showToast,
  });

  // ===============================
  // FETCH
  // ===============================
  useEffect(() => {
    if (!auth?.id) return;

    fetchItems(auth.id, {
      page,
      limit,
      q: query,
      categoryId,
      supplierId,
      stock,
      sort,
      order,
    });
  }, [auth?.id, page, query, categoryId, supplierId, stock, sort, order]);

  // ===============================
  // Handlers
  // ===============================
  const openEditModal = (item) => setEditingItem(item);

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems(auth.id, { page, limit, q: query });
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
        supplierId={supplierId}
        stock={stock}
        sortBy={sort}
        sortOrder={order}
        onQueryChange={(v) => setParam("q", v)}
        onCategoryChange={(v) => setParam("category", v)}
        onSupplierChange={(v) => setParam("supplier", v)}
        onStockChange={(v) => setParam("stock", v)}
        onSortChange={(by, ord) => {
          setParam("sort", by);
          setParam("order", ord);
        }}
        onPrev={() => setParam("page", page - 1)}
        onNext={() => setParam("page", page + 1)}
        onAdd={openModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <AddItemModal
        open={drawerOpen}
        onClose={closeModal}
        onSubmit={async (payload) => {
          await addItem(payload);
          fetchItems(auth.id, { page, limit, q: query });
        }}
      />

      <EditItemModal
        open={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSubmit={async (payload) => {
          await editItem(editingItem.id, payload);
          setEditingItem(null);
          fetchItems(auth.id, { page, limit, q: query });
        }}
      />
    </>
  );
}
