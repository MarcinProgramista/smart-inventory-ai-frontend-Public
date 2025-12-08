import styled from "styled-components";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import API_CONFIG from "../../config/api";
import useAuth from "../../hooks/useAuth";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const Modal = styled.div`
  width: 420px;
  padding: 2rem;
  border-radius: 14px;

  background: rgba(0, 170, 255, 0.18);
  border: 1px solid rgba(0, 200, 255, 0.35);
  box-shadow: 0 6px 20px rgba(0, 140, 255, 0.12);

  backdrop-filter: blur(10px);

  color: #9deaff;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
  display: block;
  svg {
    stroke: #9deaff;
    width: 26px;
    height: 26px;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-top: 8px;
  padding: 0.75rem 1rem;

  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(0, 200, 255, 0.35);
  border-radius: 12px;

  color: #9deaff;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  margin-top: 8px;
  padding: 0.75rem 1rem;

  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(0, 200, 255, 0.35);
  border-radius: 12px;

  color: #9deaff;
  outline: none;

  option {
    background: #000;
    color: #9deaff;
  }
`;

const Label = styled.label`
  margin-top: 1rem;
  display: block;
  font-size: 0.9rem;
`;

const SaveBtn = styled.button`
  margin-top: 1.8rem;
  width: 100%;
  padding: 0.9rem;

  border-radius: 12px;
  border: 1px solid rgba(0, 200, 255, 0.35);

  background: rgba(0, 170, 255, 0.18);
  color: #9deaff;

  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.2s;
`;

export default function AddItemModal({ onClose, onCreated }) {
  const { auth } = useAuth();
  const userId = Number(auth.id); // <-- dynamiczny user_id

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    min_quantity: 0,
    price: 0,
    supplier: "",
    description: "",
    category_id: "",
    user_id: userId,
  });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUPPLIERS}?user_id=${userId}`,
          { withCredentials: true }
        );
        setSuppliers(res.data);
      } catch (error) {
        console.log("Failed to load suppliers: ", error);
      }
    };
    if (userId) fetchSuppliers();
  }, [userId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORIES}?user_id=${userId}`,
          { withCredentials: true }
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    if (userId) fetchCategories();
  }, [userId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}`,
        form,
        { withCredentials: true }
      );

      onCreated();
      onClose();
    } catch (err) {
      console.error("Add item failed:", err);
    }
  };

  return (
    <Overlay>
      <Modal>
        <CloseBtn onClick={onClose}>
          <X />
        </CloseBtn>

        <h2>Add New Item</h2>

        <Label>Name</Label>
        <Input name="name" onChange={handleChange} />

        <Label>Category</Label>
        <Select name="category_id" onChange={handleChange}>
          <option value="">Select category...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>

        <Label>Quantity</Label>
        <Input name="quantity" type="number" onChange={handleChange} />

        <Label>Minimum Quantity</Label>
        <Input name="min_quantity" type="number" onChange={handleChange} />

        <Label>Price</Label>
        <Input name="price" type="number" onChange={handleChange} />

        <Label>Supplier</Label>
        <Select name="supplier" onChange={handleChange}>
          <option value="">Select supplier</option>
          {suppliers.map((sup) => (
            <option key={sup.id} value={sup.id}>
              {sup.name}
            </option>
          ))}
        </Select>

        <Label>Description</Label>
        <Input name="description" onChange={handleChange} />

        <SaveBtn onClick={handleSubmit}>Save</SaveBtn>
      </Modal>
    </Overlay>
  );
}
