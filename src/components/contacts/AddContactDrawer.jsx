import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../common/Input";
import CreateButton from "../ui/buttons/CreateButton";
import { Form, Footer } from "./AddContactDrawer.styles";
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

export default function AddContactDrawer({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const initialForm = {
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    mobile_phone: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const formatPhone = (value, withPrefix = false) => {
    if (!value) return withPrefix ? "+48 " : "";

    let digits = value.replace(/\D/g, "");

    // jeśli zaczyna się od 48 → usuń do state
    if (digits.startsWith("48")) {
      digits = digits.slice(2);
    }

    digits = digits.slice(0, 9);

    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 3));
    if (digits.length > 3) parts.push(digits.slice(3, 6));
    if (digits.length > 6) parts.push(digits.slice(6, 9));

    return (withPrefix ? "+48 " : "") + parts.join("-");
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        first_name: initialData.first_name ?? "",
        last_name: initialData.last_name ?? "",
        email: initialData.email ?? "",
        role: initialData.role ?? "",
        mobile_phone: initialData.mobile_phone ?? "",
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, open]);

  // 🔒 Jedyny mechanizm widoczności
  if (!open) return null;

  /* ===================== HANDLERS ===================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ================= PHONE =================
    if (name === "mobile_phone") {
      // pozwalamy na cyfry i +
      let raw = value.replace(/[^\d+]/g, "");

      // wyciągamy same cyfry
      let digits = raw.replace(/\D/g, "");

      // jeśli user wpisał +48 → usuwamy 48 ze state
      if (digits.startsWith("48")) {
        digits = digits.slice(2);
      }

      // max 9 cyfr
      digits = digits.slice(0, 9);

      setForm((prev) => ({
        ...prev,
        mobile_phone: digits,
      }));
    }
    // ================= OTHER FIELDS =================
    else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // ================= CLEAR ERROR ON TYPE =================
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
        <Logo>{initialData ? "Edit contact" : "Add contact"}</Logo>

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
            placeholder="+48 ___-___-___"
            value={formatPhone(form.mobile_phone, true)}
            onChange={handleChange}
            error={errors.mobile_phone}
          />

          <Footer>
            <CreateButton type="button" $variant="secondary" onClick={onClose}>
              Cancel
            </CreateButton>

            <CreateButton type="submit">
              {initialData ? "Save changes" : "Add"}
            </CreateButton>
          </Footer>
        </Form>
      </ModalBox>
    </Backdrop>
  );
}
