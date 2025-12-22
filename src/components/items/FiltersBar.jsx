// src/components/items/FiltersBar.jsx
import styled from "styled-components";
import ItemsSearchBar from "./ItemsSearchBar";
import EntityFilter from "./EntityFilter";
import StockFilter from "./StockFilter";
import SortBar from "./SortBar";

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0 1.5rem;

  > * {
    flex-shrink: 0;
  }
`;

export default function FiltersBar({
  query,
  categories,
  onQueryChange,
  categoryId,
  onCategoryChange,
  stock,
  onStockChange,
  supplierId,
  suppliers,
  onSupplierChange,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  return (
    <Bar>
      <ItemsSearchBar value={query} onChange={onQueryChange} />

      <EntityFilter
        items={categories}
        value={categoryId}
        onChange={onCategoryChange}
        allLabel="ALL CATEGORIES"
      />
      <EntityFilter
        items={suppliers}
        value={supplierId}
        onChange={onSupplierChange}
        allLabel="ALL SUPPLIERS"
      />

      <SortBar
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <StockFilter value={stock} onChange={onStockChange} />
    </Bar>
  );
}
