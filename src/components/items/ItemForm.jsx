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
  margin-top: 4px;
  margin-left: 4px;
  padding: 5px;
  font-size: 0.9rem;
  color: #ff6b6b;
  text-shadow: 0 0 6px rgba(255, 40, 40, 0.9);
`;

export default function ItemForm({
  form,
  errors,
  categories,
  suppliers,
  onChange,
  onSubmit,
}) {
  // Bezpieczne wartości domyślne
  const safe = {
    name: form.name ?? "",
    category_id: form.category_id ?? "",
    quantity: form.quantity ?? "",
    min_quantity: form.min_quantity ?? "",
    price: form.price ?? "",
    supplier_id: form.supplier_id ?? "",
    description: form.description ?? "",
  };

  return (
    <form onSubmit={onSubmit}>
      {/* NAME */}
      <FieldWrapper $error={errors.name}>
        <Input
          name="name"
          value={safe.name}
          onChange={onChange}
          placeholder="Put name of product"
        />
        {errors.name && <ErrorMessage>Name is required</ErrorMessage>}
      </FieldWrapper>

      {/* CATEGORY */}
      <FieldWrapper $error={errors.category_id}>
        <NeonDropdown
          value={safe.category_id}
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
          value={safe.quantity}
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
          value={safe.min_quantity}
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
          value={safe.price}
          onChange={onChange}
          placeholder="Put price"
        />
        {errors.price && <ErrorMessage>Price is required</ErrorMessage>}
      </FieldWrapper>

      {/* SUPPLIER */}
      <FieldWrapper $error={errors.supplier_id}>
        <NeonDropdown
          value={safe.supplier_id}
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
          value={safe.description}
          onChange={onChange}
          placeholder="Description (optional)"
        />
      </FieldWrapper>

      <CreateButton style={{ marginTop: "1.8rem" }}>Save</CreateButton>
    </form>
  );
}
