// components/items/AddItemDrawer.jsx
import styled from "styled-components";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import API_CONFIG from "../../config/api";
import useAuth from "../../hooks/useAuth";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 99998;
`;

const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(12px);
  border-left: 2px solid rgba(0, 200, 255, 0.35);
  box-shadow: -4px 0 20px rgba(0, 200, 255, 0.35);
  padding: 2rem;
  transform: translateX(${(p) => (p.open ? "0" : "100%")});
  transition: transform 0.28s ease-in-out;
  color: #9deaff;
  overflow-y: auto;
  z-index: 99999;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  display: block;

  svg {
    width: 28px;
    height: 28px;
    stroke: #9deaff;
  }
`;

const Label = styled.label`
  margin-top: 1rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 6px;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 200, 255, 0.35);
  background: rgba(0, 0, 0, 0.3);
  color: #9deaff;
`;

const Select = styled.select`
  width: 100%;
  margin-top: 6px;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 200, 255, 0.35);
  background: rgba(0, 0, 0, 0.3);
  color: #9deaff;
`;

const SaveBtn = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.9rem;
  background: rgba(0, 200, 255, 0.25);
  border: 1px solid rgba(0, 200, 255, 0.4);
  color: #9deaff;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
`;

export default function AddItemDrawer({ open, onClose, onSubmit }) {
  const { auth } = useAuth();
  const userId = Number(auth?.id) || null;

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    min_quantity: "",
    price: "",
    supplier_id: "",
    description: "",
    category_id: "",
    user_id: userId,
  });

  useEffect(() => {
    if (!open) return;

    axios
      .get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORIES}?user_id=${userId}`
      )
      .then((res) => setCategories(res.data));

    axios
      .get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUPPLIERS}?user_id=${userId}`
      )
      .then((res) => setSuppliers(res.data));
  }, [open, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      quantity: Number(form.quantity || 0),
      min_quantity: Number(form.min_quantity || 0),
      price: Number(form.price || 0),
      category_id: Number(form.category_id || 0),
    };

    onSubmit(payload);
  };

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <DrawerWrapper open={open}>
        <CloseBtn onClick={onClose}>
          <X />
        </CloseBtn>

        <h2>Add Item</h2>

        <form onSubmit={handleSubmit}>
          <Label>Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} />

          <Label>Category</Label>
          <Select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Label>Quantity</Label>
          <Input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />

          <Label>Minimum Quantity</Label>
          <Input
            type="number"
            name="min_quantity"
            value={form.min_quantity}
            onChange={handleChange}
          />

          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />

          <Label>Supplier</Label>
          <Select
            name="supplier_id"
            value={form.supplier_id}
            onChange={handleChange}
          >
            <option value="">Select supplier...</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>

          <Label>Description</Label>
          <Input
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <SaveBtn type="submit">Save</SaveBtn>
        </form>
      </DrawerWrapper>
    </>
  );
}
