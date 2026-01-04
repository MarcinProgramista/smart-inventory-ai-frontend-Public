import ListHeader from "../shared/header/ListHeader";

export default function SuppliersList({ onAdd }) {
  return (
    <>
      <ListHeader heading="Suppliers" onAdd={onAdd} addTitle="Add Supplier" />
    </>
  );
}
