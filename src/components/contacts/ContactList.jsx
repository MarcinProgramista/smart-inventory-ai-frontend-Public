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
import useAuth from "../../hooks/useAuth";
import ContactsSearchBar from "./ContactsSearchBar";
import { Pencil, Trash2 } from "lucide-react";
// const { exportCSV, exportPDF } = useExportItems();
export default function ContactList({
  contacts,
  onResul,
  onDelete,
  onEdit,
  onAdd,
}) {
  const { auth } = useAuth();
  return (
    <PageWrapper>
      <ListHeader
        onAdd={onAdd}
        // onExportCSV={() => exportCSV(contacts)}
        // onExportPDF={() => exportPDF(contacts)}
        heading="Contacts"
        addTitle="Add Contact"
      />
      <ContactsSearchBar onResult={{ onResul }} userId={auth.id} />
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
                <Td>{c.mobile_phone}</Td>
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
