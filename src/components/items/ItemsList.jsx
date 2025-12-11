import styled from "styled-components";
import { Pencil, Trash2 } from "lucide-react";
import ItemsHeader from "./ItemsHeader";
import ItemsSearchBar from "./ItemsSearchBar";

const PageWrapper = styled.div`
  padding: 2rem;
  color: #9deaff;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const TableWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  overflow-y: auto;
  max-height: calc(100vh - 250px);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px 16px;
  font-weight: 600;
  color: #9deaff;
  border-bottom: 1px solid rgba(0, 200, 255, 0.15);
  background: rgba(0, 20, 40, 0.75);
  position: sticky;
  top: 0;
  text-align: ${(p) => (p.$right ? "right" : "left")};
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 200, 255, 0.08);
  color: #c9eaff;
  text-align: ${(p) => (p.$right ? "right" : "left")};
`;

const Tr = styled.tr`
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
  cursor: pointer;

  margin-right: 6px;

  svg {
    stroke: ${(p) => (p.$delete ? "#ff6b6b" : "#9deaff")};
  }
`;

export default function ItemsList({
  items,
  onDelete,
  onEdit,
  onAdd,
  onResults,
}) {
  const formatPLN = (v) =>
    new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(v);

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

                <Td $right>{formatPLN(item.price)}</Td>
                <Td $right>{formatPLN(item.price * 1.23)}</Td>

                <Td>
                  <ActionButton onClick={() => onEdit(item)}>
                    <Pencil size={16} />
                  </ActionButton>

                  <ActionButton $delete onClick={() => onDelete(item.id)}>
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
