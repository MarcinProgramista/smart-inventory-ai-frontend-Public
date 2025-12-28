import { useState } from "react";
import styled from "styled-components";
import Input from "../common/Input";
import CreateButton from "../ui/buttons/CreateButton";
import { Title, Form, Footer } from "./AddContactDrawer.styles";
import NeonCardBright from "../ui/NeonCardBright";
import Logo from "../ui/Logo";

/* ===================== BACKDROP ===================== */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* ===================== MODAL ===================== */

const ModalBox = styled(NeonCardBright)`
  width: 520px;
  max-width: 95%;
  padding: 2.4rem;
  position: relative;
`;

/* ===================== COMPONENT ===================== */

export default function AddContactDrawer({ open, onClose, onSubmit }) {
  const initialForm = {
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    mobile_phone: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // 🔒 Jedyny mechanizm widoczności
  if (!open) return null;

  /* ===================== HANDLERS ===================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 🔥 remove error for this field while typing
    setErrors((prev) => {
      if (!prev[name]) return prev;

      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const nextErrors = {};

    // first name
    if (!form.first_name || form.first_name.trim().length < 2) {
      nextErrors.first_name = "Min. 2 characters";
    }

    // email OR phone required
    if (!form.email && !form.mobile_phone) {
      nextErrors.email = "Email is required";
      nextErrors.mobile_phone = "Phone is required";
    }

    // email format (TYLKO jeśli email istnieje)
    if (form.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        nextErrors.email = "Invalid email format";
      }
    }

    // phone format (TYLKO jeśli phone istnieje)
    if (form.mobile_phone) {
      const phoneRegex = /^[0-9]{9,15}$/;
      if (!phoneRegex.test(form.mobile_phone.trim())) {
        nextErrors.mobile_phone = "9–15 digits only";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onSubmit(form);

      setForm(initialForm);
      setErrors({});
      onClose();
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Something went wrong";

      // 🔥 backendowy błąd pod email
      setErrors((prev) => ({
        ...prev,
        email: message,
      }));
    }
  };

  /* ===================== RENDER ===================== */

  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Logo>Add contact</Logo>

        <Form onSubmit={handleSubmit}>
          <Input
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={handleChange}
            error={errors.first_name}
          />

          <Input
            name="last_name"
            placeholder="Last name"
            value={form.last_name}
            onChange={handleChange}
          />

          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
          />

          <Input
            name="mobile_phone"
            placeholder="Phone"
            value={form.mobile_phone}
            onChange={handleChange}
            error={errors.mobile_phone}
          />

          <Footer>
            <CreateButton type="button" $variant="secondary" onClick={onClose}>
              Cancel
            </CreateButton>

            <CreateButton type="submit">Add</CreateButton>
          </Footer>
        </Form>
      </ModalBox>
    </Backdrop>
  );
}
