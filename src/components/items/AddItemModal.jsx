// components/items/AddItemModal.jsx
import styled from "styled-components";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import API_CONFIG from "../../config/api";

import NeonCard from "../ui/NeonCardBright";
import Logo from "../ui/Logo";
import ItemForm from "./ItemForm";

/* -------------------------- BACKDROP -------------------------- */

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

/* -------------------------- MODAL -------------------------- */

const ModalBox = styled(NeonCard)`
  width: 520px;
  max-width: 95%;
  padding: 2.4rem;
  position: relative;
  overflow: visible !important;
`;

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

export default function AddItemModal({ open, onClose, onSubmit }) {
  const { auth } = useAuth();
  const userId = Number(auth?.id);

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    quantity: "",
    min_quantity: "",
    price: "",
    supplier_id: "",
    description: "",
  });

  // REQUIRED FIELDS (musi być zdefiniowane)
  const requiredFields = {
    name: "Name",
    category_id: "Category",
    quantity: "Quantity",
    min_quantity: "Minimum quantity",
    price: "Price",
    supplier_id: "Supplier",
  };

  /* RESET FORMULARZA PO OTWARCIU */
  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        category_id: "",
        quantity: "",
        min_quantity: "",
        price: "",
        supplier_id: "",
        description: "",
      });
      setErrors({});
    }
  }, [open]);

  /* POBIERANIE LIST */
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

  /* OBSŁUGA POLA */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // usuń błędy na bieżąco dla tego pola
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // FRONTEND VALIDATION: required
    Object.entries(requiredFields).forEach(([key]) => {
      if (!form[key] || form[key].toString().trim() === "") {
        newErrors[key] = `${requiredFields[key]} is required`;
      }
    });

    // Przykladowa reguła: nazwa nie może być tylko cyfrą
    if (form.name && /^[0-9]+$/.test(form.name.trim())) {
      newErrors.name = "Invalid item name";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Przygotuj payload (konwersje)
    const payload = {
      ...form,
      quantity: Number(form.quantity),
      min_quantity: Number(form.min_quantity),
      price: Number(form.price),
      category_id: Number(form.category_id),
      supplier_id: Number(form.supplier_id),
      user_id: userId,
    };

    try {
      setErrors({});
      // onSubmit powinien zwracać promise i RZUCać błąd jeśli backend zwraca 400
      const supplierObj = suppliers.find(
        (s) => s.id === Number(form.supplier_id)
      );
      const categoryObj = categories.find(
        (c) => c.id === Number(form.category_id)
      );

      payload.supplier_name = supplierObj?.name ?? "-";
      payload.category_name = categoryObj?.name ?? "-";
      await onSubmit(payload);
    } catch (err) {
      // jeśli backend zwraca obiekt errors -> ustaw pod inputami
      if (err?.response?.status === 400 && err.response.data?.errors) {
        const apiErrors = err.response.data?.errors;

        // backend może zwrócić tablicę lub obiekt:
        if (Array.isArray(apiErrors)) {
          // np. ["Invalid item name"]
          if (apiErrors.includes("Invalid item name")) {
            setErrors((prev) => ({ ...prev, name: "Invalid item name" }));
          } else {
            // inne tablice - umieść ogólny komunikat w name (albo na górze)
            setErrors((prev) => ({ ...prev, name: apiErrors.join(", ") }));
          }
        } else if (typeof apiErrors === "object") {
          // { name: "Item with this name already exists" }
          setErrors(apiErrors);
        } else {
          // fallback
          setErrors({ name: String(apiErrors) });
        }
        return;
      }

      // niewalidacyjny błąd serwera
      console.error("Unexpected add error:", err);
    }
  };

  return (
    <Backdrop open={open} onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>
          <X />
        </CloseBtn>

        <Logo style={{ marginBottom: "1rem" }}>Add New Item</Logo>

        <ItemForm
          form={form}
          errors={errors}
          categories={categories}
          suppliers={suppliers}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </ModalBox>
    </Backdrop>
  );
}
