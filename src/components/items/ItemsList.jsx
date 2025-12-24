import { Pencil, Trash2 } from "lucide-react";
import ListHeader from "../shared/header/ListHeader";
import { ChevronUp, ChevronDown } from "lucide-react";
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
import CategoryFilter from "./EntityFilter";
import FiltersBar from "./FiltersBar";
import StockBadge from "./StockBadge";
import useSuppliers from "../../hooks/useSuppliers";

function SortIcon({ active, order }) {
  if (!active) return null;

  return order === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}
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
  stock,
  onStockChange,
  supplierId,
  onSupplierChange,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  const formatPLN = (v) =>
    new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(v);

  const { exportCSV, exportPDF } = useExportItems();
  const categories = useCategories();
  const suppliers = useSuppliers();
  const toggleSort = (field) => {
    if (sortBy === field) {
      onSortChange(field, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(field, "asc");
    }
  };

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
        categories={categories}
        onQueryChange={onQueryChange}
        categoryId={categoryId}
        onCategoryChange={onCategoryChange}
        stock={stock}
        onStockChange={onStockChange}
        supplierId={supplierId}
        suppliers={suppliers}
        onSupplierChange={onSupplierChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />

      <TableWrapper>
        <Table>
          <thead>
            <Tr>
              <Th
                onClick={() => toggleSort("name")}
                style={{ cursor: "pointer" }}
              >
                Name <SortIcon active={sortBy === "name"} order={sortOrder} />
              </Th>
              <Th
                onClick={() => toggleSort("category")}
                style={{ cursor: "pointer" }}
              >
                Category{" "}
                <SortIcon active={sortBy === "category"} order={sortOrder} />
              </Th>
              <Th
                onClick={() => toggleSort("quantity")}
                style={{ cursor: "pointer" }}
              >
                Quantity{" "}
                <SortIcon active={sortBy === "quantity"} order={sortOrder} />
              </Th>

              <Th
                onClick={() => toggleSort("min")}
                style={{ cursor: "pointer" }}
              >
                Min <SortIcon active={sortBy === "min"} order={sortOrder} />
              </Th>

              <Th
                onClick={() => toggleSort("supplier")}
                style={{ cursor: "pointer" }}
              >
                Supplier{" "}
                <SortIcon active={sortBy === "supplier"} order={sortOrder} />
              </Th>

              <Th>Status</Th>

              <Th
                $right
                onClick={() => toggleSort("price")}
                style={{ cursor: "pointer" }}
              >
                Netto <SortIcon active={sortBy === "price"} order={sortOrder} />
              </Th>

              <Th
                $right
                onClick={() => toggleSort("price")}
                style={{ cursor: "pointer" }}
              >
                Brutto{" "}
                <SortIcon active={sortBy === "price"} order={sortOrder} />
              </Th>

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
                <Td>
                  <StockBadge
                    quantity={item.quantity}
                    min={item.min_quantity}
                  />
                </Td>

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
