//import useExportItems from "../../hooks/useExportItems";
import {
  ActionButton,
  PageWrapper,
  Table,
  TableWrapper,
  Td,
  Th,
  Tr,
} from "../shared/table/Table.styles";

import ContactsSearchBar from "./ContactsSearchBar";
import { Pencil, Trash2 } from "lucide-react";
import ListHeader from "../shared/header/ListHeader";
// const { exportCSV, exportPDF } = useExportItems();
export default function ContactList({
  contacts = [],
  filters,
  setFilters,
  onDelete,
  onEdit,
  onAdd,
}) {
  console.log(contacts);

  return (
    <PageWrapper>
      <ListHeader onAdd={onAdd} heading="Contacts" addTitle="Add Contact" />

      <ContactsSearchBar
        value={filters.q}
        onChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            q: value,
            page: 1,
          }))
        }
      />

      <TableWrapper>
        <Table>
          <thead>
            <Tr>
              <Th>First name</Th>
              <Th>Last name</Th>
              <Th>Role</Th>
              <Th>Phone</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <Tr key={c.id}>
                <Td>{c.first_name}</Td>
                <Td>{c.last_name}</Td>
                <Td>{c.role || "-"}</Td>
                <Td>{c.mobile_phone || "-"}</Td>
                <Td>{c.email || "-"}</Td>
                <Td>
                  <ActionButton onClick={() => onEdit(c)}>
                    <Pencil size={16} />
                  </ActionButton>

                  <ActionButton $delete onClick={() => onDelete(c.id)}>
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
