import styled from "styled-components";
import { Pencil, Trash2 } from "lucide-react";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  color: #9deaff;
  font-size: 0.95rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid rgba(157, 234, 255, 0.3);
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Row = styled.tr`
  transition: 0.15s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.35);
  }
`;

const LowStock = styled.span`
  color: #ff6b6b;
  font-weight: bold;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    stroke: #9deaff;
  }

  &:hover svg {
    stroke: white;
  }
`;

export default function ItemsList({ items }) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Quantity</Th>
          <Th>Min</Th>
          <Th>Supplier</Th>
          <Th>Price</Th>
          <Th>Actions</Th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <Row key={item.id}>
            <Td>{item.name}</Td>

            <Td>
              {item.quantity < item.min_quantity ? (
                <LowStock>{item.quantity} ⚠ LOW</LowStock>
              ) : (
                item.quantity
              )}
            </Td>

            <Td>{item.min_quantity}</Td>
            <Td>{item.supplier}</Td>
            <Td>${item.price}</Td>

            <Td>
              <ActionButton onClick={() => alert("Edit modal TODO")}>
                <Pencil size={18} />
              </ActionButton>

              <ActionButton onClick={() => alert("Delete confirm TODO")}>
                <Trash2 size={18} />
              </ActionButton>
            </Td>
          </Row>
        ))}
      </tbody>
    </Table>
  );
}
