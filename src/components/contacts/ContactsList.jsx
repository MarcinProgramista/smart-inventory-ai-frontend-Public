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
import styled from "styled-components";

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  opacity: 0.7;

  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  font-size: 15px;
`;

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

  onEdit,
  onDelete,
  onAdd,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  const isEmpty = contacts.length === 0;
  const isSearching = query && query.length > 0;
  const formatPhone = (phone) => {
    if (!phone) return "-";

    // usuwamy wszystko oprócz cyfr
    let digits = phone.replace(/\D/g, "");

    // obsługa +48 / 48
    if (digits.startsWith("48") && digits.length === 11) {
      digits = digits.slice(2);
    }

    // standard PL: 9 cyfr
    if (digits.length === 9) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    return phone; // fallback – nic nie psujemy
  };

  return (
    <PageWrapper>
      <ListHeader onAdd={onAdd} heading="Contacts" addTitle="Add Contact" />

      {isEmpty ? (
        <EmptyState>
          {isSearching ? (
            <p>No contacts found for "{query}"</p>
          ) : (
            <>
              <p>You don't have any contacts yet.</p>
              <p>Cilic "Add Contact" to create your first one.</p>
            </>
          )}
        </EmptyState>
      ) : (
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
                  <SortIcon
                    active={sortBy === "first_name"}
                    order={sortOrder}
                  />
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
                  <Td>{formatPhone(c.mobile_phone)}</Td>

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
      )}

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
