import styled from "styled-components";
import ListHeader from "../shared/header/ListHeader";
const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  opacity: 0.7;
`;
export default function SuppliersList({ onAdd, suppliers = [] }) {
  const isEmpty = suppliers.length === 0;
  return (
    <>
      <ListHeader heading="Suppliers" onAdd={onAdd} addTitle="Add Supplier" />
      {isEmpty && (
        <EmptyState>
          <p>You don't have any suppliers yet.</p>
        </EmptyState>
      )}
    </>
  );
}
