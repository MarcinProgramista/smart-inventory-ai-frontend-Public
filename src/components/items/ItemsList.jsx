import { Pencil, Trash2 } from "lucide-react";
import ItemsHeader from "./ItemsHeader";
import ItemsSearchBar from "./ItemsSearchBar";
import useAuth from "../../hooks/useAuth";
import useExportItems from "../../hooks/useExportItems";
import {
  TableWrapper,
  PageWrapper,
  Table,
  Th,
  Td,
  Tr,
  ActionButton,
} from "../shared/table/Table.styles";

export default function ItemsList({
  items,
  onDelete,
  onEdit,
  onAdd,
  onResults,
}) {
  const { auth } = useAuth();
  const formatPLN = (v) =>
    new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(v);
  const { exportCSV, exportPDF } = useExportItems();
  return (
    <PageWrapper>
      <ItemsHeader
        onAdd={onAdd}
        onExportCSV={() => exportCSV(items)}
        onExportPDF={() => exportPDF(items)}
      />
      <ItemsSearchBar onResults={onResults} userId={auth.id} />

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
