// pages/Items.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "../config/api";
import useAuth from "../hooks/useAuth";
import ItemsSearchBar from "../components/items/ItemsSearchBar";
import ItemsList from "../components/items/ItemsList";
import AddItemDrawer from "../components/items/AddItemDrawer";
import ToastContext from "../context/ToastContext";

export default function Items() {
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { auth } = useAuth();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useContext(ToastContext);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}?user_id=${auth.id}`,
        { withCredentials: true }
      );

      setItems(res.data);
    } catch (err) {
      console.error("Failed fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Otwieramy drawer jeśli w URL jest ?add=true
  useEffect(() => {
    const add = searchParams.get("add");
    setDrawerOpen(add === "true");
  }, [searchParams]);

  // funkcja do usuwania parametru `add`
  const clearAddParam = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("add");
    setSearchParams(newParams);
  };

  const handleOpen = () => {
    // otwieramy drawer i ustawiamy parametr w URL
    setSearchParams({ add: "true" });
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
    clearAddParam();
  };

  const handleSubmitItem = async (itemData) => {
    try {
      const res = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}`,
        itemData,
        { withCredentials: true }
      );

      const newItem = res.data;

      // dodajemy item lokalnie (identycznie jak w Notes)
      await fetchItems();
      // zamykamy drawer i usuwamy parametr
      setDrawerOpen(false);
      clearAddParam();

      showToast(
        newItem.updated ? "Item exists — quantity increased!" : "Item added!",
        "success"
      );
    } catch (err) {
      console.error("Failed adding item:", err);
      showToast("Failed to save item", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}/${id}`,
        { withCredentials: true }
      );
      setItems((prev) => prev.filter((it) => it.id !== id));
      showToast("Item deleted", "success");
    } catch (err) {
      console.error("Failed delete:", err);
      showToast("Failed to delete item", "error");
    }
  };

  // blokujemy przewijanie tła gdy drawer jest otwarty
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div style={{ padding: "2rem", color: "#9deaff", width: "100%" }}>
      <h1>Items</h1>

      <button
        onClick={() => navigate("/home")}
        className="btn btn-secondary mb-3"
      >
        ← Back
      </button>

      {/* jeśli ActionCard jest tutaj - użyj handleOpen */}
      <button className="btn btn-info mb-4" onClick={handleOpen}>
        ➕ Add Item
      </button>

      <ItemsSearchBar onResults={setItems} />
      <ItemsList items={items} onDelete={handleDelete} />

      {drawerOpen && (
        <AddItemDrawer
          open={drawerOpen}
          onClose={handleClose}
          onSubmit={handleSubmitItem}
        />
      )}
    </div>
  );
}
