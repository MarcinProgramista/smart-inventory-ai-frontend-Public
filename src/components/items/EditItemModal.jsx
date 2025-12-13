import styled from "styled-components";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import API_CONFIG from "../../config/api";

import NeonCard from "../ui/NeonCardBright";
import Logo from "../ui/Logo";
import ItemForm from "./ItemForm";

/* ------------------------------------------------------------------ */
/* BACKDROP */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* MODAL */
/* ------------------------------------------------------------------ */
const ModalBox = styled(NeonCard)`
  width: 520px;
  max-width: 95%;
  padding: 2.4rem;
  position: relative;
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

export default function EditItemModal({ open, item, onClose, onSubmit }) {
  const { auth } = useAuth();
  const userId = Number(auth?.id);

  /* REQUIRED FIELDS */
  const requiredFields = {
    name: "Name",
    category_id: "Category",
    quantity: "Quantity",
    min_quantity: "Minimum quantity",
    price: "Price",
    supplier_id: "Supplier",
  };

  const emptyForm = {
    name: "",
    category_id: "",
    quantity: "",
    min_quantity: "",
    price: "",
    supplier_id: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  /* LOAD ITEM DATA */
  useEffect(() => {
    if (!item) return;

    setForm({
      name: item.name ?? "",
      category_id: item.category_id ?? "",
      quantity: item.quantity ?? "",
      min_quantity: item.min_quantity ?? "",
      price: item.price ?? "",
      supplier_id: item.supplier_id ?? "",
      description: item.description ?? "",
    });

    setErrors({});
  }, [item]);

  /* LOAD CATEGORIES + SUPPLIERS */
  useEffect(() => {
    if (!open) return;

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
  }, [open, userId]);

  /* ---------------------- SUBMIT ---------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // required fields
    Object.entries(requiredFields).forEach(([key, label]) => {
      if (!form[key] || form[key].toString().trim() === "") {
        newErrors[key] = `${label} is required`;
      }
    });

    // name validation
    if (form.name && /^[0-9]+$/.test(form.name.trim())) {
      newErrors.name = "Invalid item name";
    }
    if (form.name && form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 🔥 NORMALIZACJA CENY (PL → backend)
    const payload = {
      ...form,
      price: Number(String(form.price).replace(",", ".")),
    };

    setErrors({});

    const result = await onSubmit(payload);

    if (result?.validationErrors) {
      setErrors(result.validationErrors);
      return;
    }

    // sukces → modal zamyka rodzic
  };

  /* CLEAR ERROR ON CHANGE */
  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  return (
    <Backdrop open={open} onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>
          <X />
        </CloseBtn>

        <Logo>Edit Item</Logo>

        <ItemForm
          form={form}
          errors={errors}
          categories={categories}
          suppliers={suppliers}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
        />
      </ModalBox>
    </Backdrop>
  );
}
