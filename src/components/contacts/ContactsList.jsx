import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import {
  TableWrapper,
  PageWrapper,
  Table,
  Th,
  Td,
  Tr,
  ActionButton,
} from "../shared/table/Table.styles";
import SearchBar from "../shared/search/SearchBar";
import ListHeader from "../shared/header/ListHeader";
import Pagination from "../shared/Pagination";
function SortIcon({ active, order }) {
  if (!active) return null;

  return order === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}
export default function ContactsList({
  contacts,
  query,
  page,
  limit,
  total,
  onPrev,
  onNext,
  onQueryChange,
  onEdit,
  onDelete,
  onAdd,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  return (
    <PageWrapper>
      <ListHeader onAdd={onAdd} heading="Contacts" addTitle="Add Contact" />
      <SearchBar
        value={query}
        onChange={onQueryChange}
        placeholder="Search contacts..."
      />
      <TableWrapper>
        <Table>
          <thead>
            <Tr>
              <Th
                onClick={() =>
                  onSortChange(
                    "first_name",
                    sortOrder === "asc" ? "desc" : "asc"
                  )
                }
              >
                First name
                <SortIcon active={sortBy === "first_name"} order={sortOrder} />
              </Th>
              <Th
                onClick={() =>
                  onSortChange(
                    "last_name",
                    sortOrder === "asc" ? "desc" : "asc"
                  )
                }
              >
                Last name{" "}
                <SortIcon active={sortBy === "last_name"} order={sortOrder} />
              </Th>
              <Th
                onClick={() =>
                  onSortChange("email", sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Email
                <SortIcon active={sortBy === "email"} order={sortOrder} />
              </Th>
              <Th>Phone</Th>
              <Th
                onClick={() =>
                  onSortChange("role", sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Role
                <SortIcon active={sortBy === "role"} order={sortOrder} />
              </Th>
              <Th>Action</Th>
            </Tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <Tr key={c.id}>
                <Td>{c.first_name}</Td>
                <Td>{c.last_name}</Td>
                <Td>{c.email || "-"}</Td>
                <Td>{c.mobile_phone || "-"}</Td>
                <Td>{c.role || "-"}</Td>
                <Td>
                  <ActionButton onClick={() => onEdit(c)}>
                    <Pencil size={16} />
                  </ActionButton>
                  <ActionButton $delete onClick={() => onDelete(c)}>
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
