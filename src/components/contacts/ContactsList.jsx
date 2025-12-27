import { Pencil, Trash2 } from "lucide-react";
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
              </Th>
              <Th
                onClick={() =>
                  onSortChange(
                    "last_name",
                    sortOrder === "asc" ? "desc" : "asc"
                  )
                }
              >
                Last name
              </Th>
              <Th
                onClick={() =>
                  onSortChange("email", sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Email
              </Th>
              <Th>Phone</Th>
              <Th>Role</Th>
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
