import { useState } from "react";
import Input from "../common/Input";
import CreateButton from "../ui/buttons/CreateButton";
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  drawer: {
    width: 300,
    background: "#111",
    padding: 16,
    height: "100%",
  },
};
export default function AddContactDrawer({ open, onClose, onSubmit }) {
  const initialForm = {
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    mobile_phone: "",
  };

  const [form, setForm] = useState(initialForm);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.first_name.trim()) {
      alert("First name is required");
      return;
    }

    if (!form.email.trim() && !form.mobile_phone.trim()) {
      alert("Email or phone is required");
      return;
    }

    await onSubmit(form);
    setForm(initialForm); // 🔥 reset
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.drawer}>
        <h3>Add Contact</h3>

        <form onSubmit={handleSubmit}>
          <Input
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={handleChange}
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
          />

          <div style={{ marginTop: "1rem" }}>
            <CreateButton type="submit">Add</CreateButton>
            <CreateButton type="button" onClick={onClose}>
              Cancel
            </CreateButton>
          </div>
        </form>
      </div>
    </div>
  );
}
