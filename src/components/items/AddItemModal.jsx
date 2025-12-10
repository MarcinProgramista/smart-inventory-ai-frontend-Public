// components/items/AddItemModal.jsx
import styled from "styled-components";
import { X, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import API_CONFIG from "../../config/api";

import NeonCard from "../ui/NeonCardBright";
import Input from "../common/Input";
import CreateButton from "../ui/buttons/CreateButton";
import Logo from "../ui/Logo";
import NeonDropdown from "../ui/NeonDropdown";

/* -------------------------- TOASTY -------------------------- */

const ErrorToast = styled.div`
  position: fixed;
  top: 20px;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 0.7rem;

  background: rgba(70, 0, 0, 0.85);
  color: #ff6b6b;
  padding: 1rem 1.6rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 80, 80, 0.6);

  box-shadow:
    0 0 12px rgba(255, 60, 60, 0.8),
    inset 0 0 10px rgba(255, 60, 60, 0.35);
  backdrop-filter: blur(6px);

  opacity: ${(p) => (p.$show ? 1 : 0)};
  transform: translateY(${(p) => (p.$show ? "0" : "-15px")});
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
`;

const SuccessToast = styled(ErrorToast)`
  background: rgba(0, 60, 0, 0.85);
  color: #8aff8a;
  border: 1px solid rgba(80, 255, 80, 0.6);
  box-shadow:
    0 0 12px rgba(80, 255, 80, 0.8),
    inset 0 0 10px rgba(80, 255, 80, 0.35);

  svg {
    stroke: #8aff8a;
  }
`;

/* -------------------------- INPUT Z BŁĘDEM -------------------------- */

const FieldWrapper = styled.div`
  margin-top: 0.9rem;

  input,
  & > div {
    border: ${(p) =>
      p.$error
        ? "1px solid rgba(255, 80, 80, 0.9) !important"
        : "1px solid rgba(0, 200, 255, 0.35) !important"};

    box-shadow: ${(p) =>
      p.$error
        ? `0 0 12px rgba(255, 60, 60, 0.9),
           inset 0 0 10px rgba(255, 60, 60, 0.35)`
        : "none"} !important;

    border-radius: 12px;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 4px;
  margin-left: 4px;
  padding: 5px;
  font-size: 0.9rem;
  color: #ff6b6b;

  text-shadow: 0 0 6px rgba(255, 40, 40, 0.9);
`;

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

/* -------------------------- KOMPONENT -------------------------- */

export default function AddItemModal({ open, onClose, onSubmit }) {
  const { auth } = useAuth();
  const userId = Number(auth?.id);

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [toast, setToast] = useState(null);
  const [success, setSuccess] = useState(null);
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

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 2600);
  };

  /* RESET FORMULARZA PRZY OTWARCIU */
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
    setForm((f) => ({ ...f, [name]: value }));
  };

  /* WALIDACJA */
  const requiredFields = {
    name: "Name",
    category_id: "Category",
    quantity: "Quantity",
    min_quantity: "Minimum quantity",
    price: "Price",
    supplier_id: "Supplier",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(requiredFields).forEach(([key]) => {
      if (!form[key] || form[key] === "") newErrors[key] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      showToast(`${requiredFields[firstKey]} is required`);
      return;
    }

    setErrors({});

    const payload = {
      ...form,
      quantity: Number(form.quantity),
      min_quantity: Number(form.min_quantity),
      price: Number(form.price),
      category_id: Number(form.category_id),
      supplier_id: Number(form.supplier_id),
      user_id: userId,
    };

    onSubmit(payload);
    showSuccess("Item successfully added!");
  };

  return (
    <>
      {toast && (
        <ErrorToast $show={!!toast}>
          <AlertTriangle />
          {toast}
        </ErrorToast>
      )}

      {success && (
        <SuccessToast $show={!!success}>
          <CheckCircle />
          {success}
        </SuccessToast>
      )}

      <Backdrop open={open} onClick={onClose}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <CloseBtn onClick={onClose}>
            <X />
          </CloseBtn>

          <Logo style={{ marginBottom: "1rem" }}>Add New Item</Logo>

          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <FieldWrapper $error={errors.name}>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Put name of product"
              />
              {errors.name && <ErrorMessage>Name is required</ErrorMessage>}
            </FieldWrapper>

            {/* CATEGORY */}
            <FieldWrapper $error={errors.category_id}>
              <NeonDropdown
                value={form.category_id}
                onChange={(val) => setForm((f) => ({ ...f, category_id: val }))}
                options={categories.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                placeholder="Select category…"
              />
              {errors.category_id && (
                <ErrorMessage>Category is required</ErrorMessage>
              )}
            </FieldWrapper>

            {/* QUANTITY */}
            <FieldWrapper $error={errors.quantity}>
              <Input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Put quantity"
              />
              {errors.quantity && (
                <ErrorMessage>Quantity is required</ErrorMessage>
              )}
            </FieldWrapper>

            {/* MIN QUANTITY */}
            <FieldWrapper $error={errors.min_quantity}>
              <Input
                type="number"
                name="min_quantity"
                value={form.min_quantity}
                onChange={handleChange}
                placeholder="Put min quantity"
              />
              {errors.min_quantity && (
                <ErrorMessage>Min quantity is required</ErrorMessage>
              )}
            </FieldWrapper>

            {/* PRICE */}
            <FieldWrapper $error={errors.price}>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Put price"
              />
              {errors.price && <ErrorMessage>Price is required</ErrorMessage>}
            </FieldWrapper>

            {/* SUPPLIER */}
            <FieldWrapper $error={errors.supplier_id}>
              <NeonDropdown
                value={form.supplier_id}
                onChange={(val) => setForm((f) => ({ ...f, supplier_id: val }))}
                options={suppliers.map((s) => ({
                  value: s.id,
                  label: s.name,
                }))}
                placeholder="Select supplier…"
              />
              {errors.supplier_id && <ErrorMessage>S is required</ErrorMessage>}
            </FieldWrapper>

            {/* DESCRIPTION */}
            <FieldWrapper>
              <Input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description (optional)"
              />
            </FieldWrapper>

            <CreateButton style={{ marginTop: "1.8rem" }}>Save</CreateButton>
          </form>
        </ModalBox>
      </Backdrop>
    </>
  );
}
