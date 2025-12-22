import { Pencil, Trash2 } from "lucide-react";
import ListHeader from "../shared/header/ListHeader";
import ItemsSearchBar from "./ItemsSearchBar";
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
import Pagination from "../shared/Pagination";
import useCategories from "../../hooks/useCategories";
import CategoryFilter from "./CategoryFilter";
import FiltersBar from "./FiltersBar";

export default function ItemsList({
  items,
  page,
  limit,
  total,
  query,
  onQueryChange,
  categoryId,
  onCategoryChange,
  onPrev,
  onNext,
  onDelete,
  onEdit,
  onAdd,
}) {
  const formatPLN = (v) =>
    new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(v);

  const { exportCSV, exportPDF } = useExportItems();
  const categories = useCategories();

  return (
    <PageWrapper>
      <ListHeader
        onAdd={onAdd}
        onExportCSV={() => exportCSV(items)}
        onExportPDF={() => exportPDF(items)}
        heading="Items"
        addTitle="Add Item"
      />

      <FiltersBar
        query={query}
        onQueryChange={onQueryChange}
        categoryId={categoryId}
        onCategoryChange={onCategoryChange}
      />
      <TableWrapper>
        <Table>
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
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
                <Td>{item.category_name || "-"}</Td>
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

      <Pagination
        page={page}
        totalPages={Math.ceil(total / limit)}
        canPrev={page > 1}
        canNext={page < Math.ceil(total / limit)}
        onPrev={onPrev}
        onNext={onNext}
      />
    </PageWrapper>
  );
}
