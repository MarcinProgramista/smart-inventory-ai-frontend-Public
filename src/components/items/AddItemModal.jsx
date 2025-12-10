// components/items/AddItemModal.jsx
import styled from "styled-components";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import API_CONFIG from "../../config/api";

import NeonCard from "../ui/NeonCardBright";
import Input from "../common/Input";
import LabelWrapper from "../ui/LabelWrapper";
import CreateButton from "../ui/buttons/CreateButton";
import Logo from "../ui/Logo";
import NeonDropdown from "../ui/NeonDropdown";

/* ===== BACKDROP ===== */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 9998;
  display: ${(p) => (p.open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

/* ===== NEON MODAL CARD ===== */
const ModalBox = styled(NeonCard)`
  width: 520px;
  max-width: 95%;
  padding: 2.4rem;
  position: relative;
  overflow: visible !important; /* 👈 FIX — pozwala SELECTowi się rozwinąć */
`;

/* ===== CLOSE BUTTON ===== */
const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 18px;
  right: 18px;

  svg {
    width: 26px;
    height: 26px;
    stroke: #9deaff;
  }
`;

/* ===== NEON SELECT ===== */
const NeonSelect = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 6px;

  background: rgba(0, 40, 70, 0.55);
  border-radius: 12px;
  border: 1px solid rgba(0, 200, 255, 0.35);
  color: #9deaff;
  font-size: 1rem;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  box-shadow:
    0 0 14px rgba(0, 200, 255, 0.4),
    inset 0 0 12px rgba(0, 200, 255, 0.15);

  &:focus {
    outline: none;
    border-color: #00c8ff;
    box-shadow:
      0 0 18px rgba(0, 200, 255, 0.7),
      inset 0 0 14px rgba(0, 200, 255, 0.35);
  }

  /* 🔥 Custom dropdown menu */
  & option {
    background: rgba(0, 25, 45, 0.95) !important;
    color: #9deaff;
    padding: 10px;
  }

  /* dla Chrome/Edge – wymusza neonowe tło popupu */
  &::-ms-expand {
    display: none;
  }

  /* dla Firefox – wymusza ciemne tło dropdowna */
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #9deaff;
  }
`;

export default function AddItemModal({ open, onClose, onSubmit }) {
  const { auth } = useAuth();
  const userId = Number(auth?.id);

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

  /* Reset formularza przy każdym otwarciu */
  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        quantity: "",
        min_quantity: "",
        price: "",
        supplier_id: "",
        description: "",
        category_id: "",
        user_id: userId,
      });
    }
  }, [open, userId]);

  /* Pobieranie kategorii i dostawców */
  useEffect(() => {
    if (!open) return;

    axios
      .get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORIES}?user_id=${userId}`
      )
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));

    axios
      .get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUPPLIERS}?user_id=${userId}`
      )
      .then((res) => setSuppliers(res.data))
      .catch(() => setSuppliers([]));
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
      user_id: userId,
    };
    onSubmit(payload);
  };

  return (
    <Backdrop open={open} onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>
          <X />
        </CloseBtn>

        <Logo style={{ marginBottom: "1rem" }}>Add New Item</Logo>

        <form onSubmit={handleSubmit}>
          <LabelWrapper>Name</LabelWrapper>
          <Input name="name" value={form.name} onChange={handleChange} />

          <LabelWrapper>Category</LabelWrapper>
          <NeonDropdown
            value={form.category_id}
            onChange={(val) => setForm((f) => ({ ...f, category_id: val }))}
            options={categories.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
            placeholder="Select category…"
          />

          <LabelWrapper>Quantity</LabelWrapper>
          <Input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />

          <LabelWrapper>Minimum Quantity</LabelWrapper>
          <Input
            type="number"
            name="min_quantity"
            value={form.min_quantity}
            onChange={handleChange}
          />

          <LabelWrapper>Price</LabelWrapper>
          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />

          <LabelWrapper>Supplier</LabelWrapper>
          <NeonDropdown
            value={form.supplier_id}
            onChange={(val) => setForm((f) => ({ ...f, supplier_id: val }))}
            options={suppliers.map((s) => ({
              value: s.id,
              label: s.name,
            }))}
            placeholder="Select supplier…"
          />

          <LabelWrapper>Description</LabelWrapper>
          <Input
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <CreateButton style={{ marginTop: "1.8rem" }}>Save</CreateButton>
        </form>
      </ModalBox>
    </Backdrop>
  );
}
