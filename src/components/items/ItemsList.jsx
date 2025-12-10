import styled from "styled-components";
import { Pencil, Trash2 } from "lucide-react";
import ItemsHeader from "./ItemsHeader";
import ItemsSearchBar from "./ItemsSearchBar";

/* ----------------- STYLES ----------------- */

const PageWrapper = styled.div`
  padding: 2rem;
  color: #9deaff;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TableWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  overflow-y: auto;
  max-height: calc(100vh - 250px);
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  backdrop-filter: blur(6px);
`;

const Th = styled.th`
  padding: 12px 16px;
  text-align: ${(p) => (p.$right ? "right" : "left")};
  font-weight: 600;
  color: #9deaff;
  border-bottom: 1px solid rgba(0, 200, 255, 0.15);

  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(0, 20, 40, 0.75);
  backdrop-filter: blur(10px);
`;

const Td = styled.td`
  padding: 12px 16px;
  color: #c9eaff;
  border-bottom: 1px solid rgba(0, 200, 255, 0.08);
  white-space: nowrap;
  text-align: ${(p) => (p.$right ? "right" : "left")};
`;

const Tr = styled.tr`
  transition: background 0.25s ease;

  &:hover {
    background: rgba(0, 120, 200, 0.1);
  }
`;

const ActionButton = styled.button`
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid
    ${(p) => (p.$delete ? "rgba(255,80,80,0.6)" : "rgba(0,200,255,0.6)")};
  background: rgba(0, 0, 0, 0.2);
  color: ${(p) => (p.$delete ? "#ff6b6b" : "#9deaff")};
  cursor: pointer;
  transition: 0.2s ease;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  svg {
    stroke: ${(p) => (p.$delete ? "#ff6b6b" : "#9deaff")};
  }

  &:hover {
    background: ${(p) =>
      p.$delete ? "rgba(255,80,80,0.15)" : "rgba(0,200,255,0.15)"};
    box-shadow: 0 0 8px
      ${(p) => (p.$delete ? "rgba(255,80,80,0.5)" : "rgba(0,200,255,0.5)")};
  }
`;

/* ----------------- COMPONENT ----------------- */

export default function ItemsList({
  items,
  onDelete,
  onEdit,
  onAdd,
  onResults,
}) {
  const formatPLN = (value) =>
    new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      minimumFractionDigits: 2,
    }).format(value);

  const toBrutto = (netto) => netto * 1.23;

  return (
    <PageWrapper>
      <ItemsHeader onAdd={onAdd} />
      <ItemsSearchBar onResults={onResults} />

      <TableWrapper>
        <Table>
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Quantity</Th>
              <Th>Min</Th>
              <Th>Supplier</Th>
              <Th $right>Netto</Th>
              <Th $right>Brutto</Th>
              <Th>Actions</Th>
            </Tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.min_quantity}</Td>
                <Td>{item.supplier_name || "-"}</Td>

                {/* NETTO */}
                <Td $right>{formatPLN(item.price)}</Td>

                {/* BRUTTO */}
                <Td $right>{formatPLN(toBrutto(item.price))}</Td>

                <Td>
                  <ActionButton onClick={() => onEdit?.(item)}>
                    <Pencil size={16} />
                  </ActionButton>

                  <ActionButton
                    $delete
                    style={{ marginLeft: "8px" }}
                    onClick={() => onDelete && onDelete(item.id)}
                  >
                    <Trash2 size={16} />
                  </ActionButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </PageWrapper>
  );
}
