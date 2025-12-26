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

  // 🔥 DLA FILTRÓW I SORTU → reset page
  const setFilterParam = (key, value) => {
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

  // 🔥 TYLKO SORT (MUSI BYĆ W JEDNYM SET)
  const setSortParams = (by, order) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", by);
      next.set("order", order);
      next.set("page", 1);
      return next;
    });
  };

  // 🔥 TYLKO PAGINACJA (bez resetu)
  const setPageParam = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", value);
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
  const sortBy = getParam("sort", "name");
  const sortOrder = getParam("order", "asc");
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
      sort: sortBy,
      order: sortOrder,
    });
  }, [auth?.id, page, query, categoryId, supplierId, stock, sortBy, sortOrder]);

  // ===============================
  // Handlers
  // ===============================
  const openEditModal = (item) => setEditingItem(item);

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems(auth.id, { page, limit, q: query });
  };
  const stockCounts = items.reduce(
    (acc, item) => {
      acc[item.stock_status] = (acc[item.stock_status] || 0) + 1;
      return acc;
    },
    { out: 0, low: 0, ok: 0, na: 0 }
  );

  // ===============================
  // RENDER
  // ===============================
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
        sortBy={sortBy}
        sortOrder={sortOrder}
        onQueryChange={(v) => setFilterParam("q", v)}
        onCategoryChange={(v) => setFilterParam("category", v)}
        onSupplierChange={(v) => setFilterParam("supplier", v)}
        onStockChange={(v) => setFilterParam("stock", v)}
        onSortChange={(by, ord) => setSortParams(by, ord)}
        onPrev={() => setPageParam(page - 1)}
        onNext={() => setPageParam(page + 1)}
        onAdd={openModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
        stockCounts={stockCounts}
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
