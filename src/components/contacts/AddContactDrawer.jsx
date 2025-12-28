import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../common/Input";
import CreateButton from "../ui/buttons/CreateButton";
import { Form, Footer } from "./AddContactDrawer.styles";
import NeonCardBright from "../ui/NeonCardBright";
import Logo from "../ui/Logo";

/* ===================== CONSTANTS ===================== */

const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  role: "",
  mobile_phone: "",
};

/* ===================== STYLES ===================== */

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
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* ===================== EFFECT: PREFILL ===================== */

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
      setForm(EMPTY_FORM);
    }

    setErrors({});
  }, [initialData, open]);

  if (!open) return null;

  /* ===================== HELPERS ===================== */

  const formatPhone = (value, withPrefix = false) => {
    if (!value) return withPrefix ? "+48 " : "";

    let digits = value.replace(/\D/g, "");

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

  /* ===================== HANDLERS ===================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile_phone") {
      let digits = value.replace(/\D/g, "");

      if (digits.startsWith("48")) {
        digits = digits.slice(2);
      }

      digits = digits.slice(0, 9);

      setForm((prev) => ({
        ...prev,
        mobile_phone: digits,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.first_name || form.first_name.trim().length < 2) {
      nextErrors.first_name = "Min. 2 characters";
    }

    if (!form.email && !form.mobile_phone) {
      nextErrors.email = "Email is required";
      nextErrors.mobile_phone = "Phone is required";
    }

    if (form.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        nextErrors.email = "Invalid email format";
      }
    }

    if (form.mobile_phone) {
      if (!/^[0-9]{9}$/.test(form.mobile_phone)) {
        nextErrors.mobile_phone = "9 digits required";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit(form);

      setForm(EMPTY_FORM);
      setErrors({});
      onClose();
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Something went wrong";

      setErrors((prev) => ({
        ...prev,
        email: message,
      }));
    } finally {
      setSubmitting(false);
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
            <CreateButton
              type="button"
              $variant="secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </CreateButton>

            <CreateButton type="submit" disabled={submitting}>
              {initialData ? "Save changes" : "Add"}
            </CreateButton>
          </Footer>
        </Form>
      </ModalBox>
    </Backdrop>
  );
}
