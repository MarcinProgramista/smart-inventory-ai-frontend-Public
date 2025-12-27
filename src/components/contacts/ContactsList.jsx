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

export default function ContactsList({
  contacts,
  query,
  onQueryChange,
  onEdit,
  onDelete,
  onAdd,
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
              <Th>First name</Th>
              <Th>Last name</Th>
              <Th>Email</Th>
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
    </PageWrapper>
  );
}
