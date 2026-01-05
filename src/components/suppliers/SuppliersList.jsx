import styled from "styled-components";
import ListHeader from "../shared/header/ListHeader";
import {
  PageWrapper,
  Table,
  TableWrapper,
  Td,
  Th,
  Tr,
} from "../shared/table/Table.styles";
import Pagination from "../shared/Pagination";
const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  opacity: 0.7;
`;
export default function SuppliersList({
  onAdd,
  suppliers,
  page,
  limit,
  total,
  onNext,
  onPrev,
}) {
  const isEmpty = suppliers.length === 0;
  return (
    <PageWrapper>
      <ListHeader heading="Suppliers" onAdd={onAdd} addTitle="Add Supplier" />
      {isEmpty ? (
        <EmptyState>
          <p>You don't have any suppliers yet.</p>
        </EmptyState>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <Tr>
                <Th>Name</Th>
                <Th>City</Th>
                <Th>Country</Th>
                <Th>Contact</Th>
              </Tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <Tr key={s.id}>
                  <Td>{s.name}</Td>
                  <Td>{s.city}</Td>
                  <Td>{s.country}</Td>
                  <Td>
                    {s.contact
                      ? `${s.contact.first_name} ${s.contact.last_name}`
                      : "-"}
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
