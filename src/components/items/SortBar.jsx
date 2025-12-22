import styled from "styled-components";
import NeonSelect from "../ui/selects/NeonSelect";

const Wrapper = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export default function SortBar({ sortBy, sortOrder, onSortChange }) {
  return (
    <Wrapper>
      <NeonSelect
        value={sortBy}
        onChange={(v) => onSortChange(v, sortOrder)}
        width="180px"
        size="sm"
        options={[
          { value: "name", label: "Name" },
          { value: "quantity", label: "Quantity" },
          { value: "price", label: "Price" },
          { value: "created_at", label: "Created date" },
        ]}
      />
      <NeonSelect
        value={sortOrder}
        onChange={(v) => onSortChange(sortBy, v)}
        width="120px"
        size="sm"
        options={[
          { value: "asc", label: "ASC" },
          { value: "desc", label: "DESC" },
        ]}
      />
    </Wrapper>
  );
}
