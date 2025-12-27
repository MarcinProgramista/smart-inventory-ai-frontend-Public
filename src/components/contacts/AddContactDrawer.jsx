import { useState } from "react";
import Input from "../common/Input";
import CreateButton from "../ui/buttons/CreateButton";
import {
  Overlay,
  Drawer,
  Title,
  Form,
  Footer,
} from "./AddContactDrawer.styles";

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

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.first_name || form.first_name.trim().length < 2) {
      nextErrors.first_name = "Min. 2 characters";
    }

    if (form.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        nextErrors.email = "Invalid email";
      }
    }

    if (form.mobile_phone) {
      const phoneRegex = /^[0-9]{9,15}$/;
      if (!phoneRegex.test(form.mobile_phone)) {
        nextErrors.mobile_phone = "9–15 digits only";
      }
    }

    if (!form.email && !form.mobile_phone) {
      nextErrors.email = "Email or phone required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit(form);
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Drawer onClick={(e) => e.stopPropagation()}>
        <Title>Add contact</Title>

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
            <CreateButton type="button" onClick={onClose} variant="secondary">
              Cancel
            </CreateButton>
            <CreateButton type="submit">Add</CreateButton>
          </Footer>
        </Form>
      </Drawer>
    </Overlay>
  );
}
