// ItemForm.jsx
import styled from "styled-components";
import Input from "../common/Input";
import NeonDropdown from "../ui/NeonDropdown";
import CreateButton from "../ui/buttons/CreateButton";

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
  margin-top: 6px;
  margin-left: 4px;
  padding: 6px 10px;
  font-size: 0.9rem;
  font-weight: 500;

  color: #ff4d6d;
  background: rgba(255, 50, 70, 0.12);

  border-left: 3px solid rgba(255, 60, 80, 0.9);
  border-radius: 6px;

  text-shadow: 0 0 6px rgba(255, 40, 40, 0.8);
  box-shadow: 0 0 10px rgba(255, 40, 40, 0.45);

  animation: glowPulse 1.4s ease-in-out infinite alternate;

  @keyframes glowPulse {
    from {
      box-shadow: 0 0 6px rgba(255, 40, 40, 0.4);
    }
    to {
      box-shadow: 0 0 14px rgba(255, 40, 40, 0.9);
    }
  }
`;

export default function ItemForm({
  form,
  errors,
  categories,
  suppliers,
  onChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      {/* NAME */}
      <FieldWrapper $error={errors.name}>
        <Input
          name="name"
          value={form.name ?? ""}
          onChange={onChange}
          placeholder="Put name of product"
        />
        {errors.name && (
          <ErrorMessage>
            {Array.isArray(errors.name) ? errors.name[0] : errors.name}
          </ErrorMessage>
        )}
      </FieldWrapper>

      {/* CATEGORY */}
      <FieldWrapper $error={errors.category_id}>
        <NeonDropdown
          value={form.category_id ?? ""}
          onChange={(val) =>
            onChange({ target: { name: "category_id", value: val } })
          }
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
          value={form.quantity ?? ""}
          onChange={onChange}
          placeholder="Put quantity"
        />
        {errors.quantity && <ErrorMessage>Quantity is required</ErrorMessage>}
      </FieldWrapper>

      {/* MIN QUANTITY */}
      <FieldWrapper $error={errors.min_quantity}>
        <Input
          type="number"
          name="min_quantity"
          value={form.min_quantity ?? ""}
          onChange={onChange}
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
          value={form.price ?? ""}
          onChange={onChange}
          placeholder="Put price"
        />
        {errors.price && <ErrorMessage>Price is required</ErrorMessage>}
      </FieldWrapper>

      {/* SUPPLIER */}
      <FieldWrapper $error={errors.supplier_id}>
        <NeonDropdown
          value={form.supplier_id ?? ""}
          onChange={(val) =>
            onChange({ target: { name: "supplier_id", value: val } })
          }
          options={suppliers.map((s) => ({
            value: s.id,
            label: s.name,
          }))}
          placeholder="Select supplier…"
        />
        {errors.supplier_id && (
          <ErrorMessage>Supplier is required</ErrorMessage>
        )}
      </FieldWrapper>

      {/* DESCRIPTION */}
      <FieldWrapper>
        <Input
          name="description"
          value={form.description ?? ""}
          onChange={onChange}
          placeholder="Description (optional)"
        />
      </FieldWrapper>

      <CreateButton style={{ marginTop: "1.8rem" }}>Save</CreateButton>
    </form>
  );
}
