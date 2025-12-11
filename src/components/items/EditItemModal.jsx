import styled from "styled-components";
import { X, CheckCircle, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import API_CONFIG from "../../config/api";

import NeonCard from "../ui/NeonCardBright";
import Logo from "../ui/Logo";
import ItemForm from "./ItemForm";

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

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState(item || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item) setForm(item);
  }, [item]);

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
  }, [open]);

  return (
    <Backdrop open={open} onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>
          <X />
        </CloseBtn>

        <Logo>Edit Item</Logo>

        <ItemForm
          isEdit={true}
          form={form}
          errors={errors}
          categories={categories}
          suppliers={suppliers}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          onSubmit={(e) => onSubmit(e, form)}
        />
      </ModalBox>
    </Backdrop>
  );
}
