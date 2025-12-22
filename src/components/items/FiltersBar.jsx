// src/components/items/FiltersBar.jsx
import styled from "styled-components";
import ItemsSearchBar from "./ItemsSearchBar";
import CategoryFilter from "./CategoryFilter";
import StockFilter from "./StockFilter";
// import StockFilter from "./StockFilter"; // później

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
}) {
  return (
    <Bar>
      <ItemsSearchBar value={query} onChange={onQueryChange} />

      <CategoryFilter
        value={categoryId}
        onChange={onCategoryChange}
        categories={categories}
      />

      <StockFilter value={stock} onChange={onStockChange} />
    </Bar>
  );
}
