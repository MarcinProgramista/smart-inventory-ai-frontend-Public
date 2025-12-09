import { useState, useEffect, useContext } from "react";
import axios from "axios";
import API_CONFIG from "../../config/api";
import useAuth from "../../hooks/useAuth";
import ToastContext from "../../context/ToastContext";

export default function AddItemPanel({ onClose, onCreated }) {
  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);
  const userId = Number(auth?.id);

  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    min_quantity: 0,
    price: 0,
    supplier_id: "",
    description: "",
    category_id: "",
    user_id: userId,
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORIES}?user_id=${userId}`
      )
      .then((r) => setCategories(r.data));

    axios
      .get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUPPLIERS}?user_id=${userId}`
      )
      .then((r) => setSuppliers(r.data));
  }, [userId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}`,
        form,
        { withCredentials: true }
      );

      showToast("Item saved!", "success");
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      showToast("Failed to save item", "error");
    }
  };

  return (
    <div
      style={{
        padding: "1.5rem",
        background: "rgba(0, 0, 0, 0.35)",
        borderRadius: "14px",
        border: "1px solid rgba(157,234,255,0.35)",
        backdropFilter: "blur(6px)",
        width: "100%",
        color: "#9deaff",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>➕ Add New Item</h3>

      <label>Name</label>
      <input className="form-control" name="name" onChange={handleChange} />

      <label className="mt-2">Category</label>
      <select
        className="form-select"
        name="category_id"
        onChange={handleChange}
      >
        <option value="">Select...</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <label className="mt-2">Quantity</label>
      <input
        className="form-control"
        type="number"
        name="quantity"
        onChange={handleChange}
      />

      <label className="mt-2">Minimum Quantity</label>
      <input
        className="form-control"
        type="number"
        name="min_quantity"
        onChange={handleChange}
      />

      <label className="mt-2">Price</label>
      <input
        className="form-control"
        type="number"
        name="price"
        onChange={handleChange}
      />

      <label className="mt-2">Supplier</label>
      <select
        className="form-select"
        name="supplier_id"
        onChange={handleChange}
      >
        <option value="">Select supplier...</option>
        {suppliers.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <label className="mt-2">Description</label>
      <input
        className="form-control"
        name="description"
        onChange={handleChange}
      />

      <button className="btn btn-info w-100 mt-3" onClick={handleSubmit}>
        Save
      </button>

      <button
        className="btn btn-outline-secondary w-100 mt-2"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
}
