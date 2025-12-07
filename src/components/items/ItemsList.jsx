import styled from "styled-components";

const ListWrapper = styled.div`
  margin-top: 2rem;
`;

const ItemCard = styled.div`
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid #9deaff;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  color: #9deaff;
  margin: 0;
`;

const Supplier = styled.p`
  opacity: 0.8;
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button`
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: 1px solid #9deaff;
  color: #9deaff;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: rgba(157, 234, 255, 0.1);
  }
`;

export default function ItemsList({ items }) {
  if (items.length === 0)
    return <p style={{ marginTop: "1rem" }}>No items found.</p>;

  return (
    <ListWrapper>
      {items.map((item) => (
        <ItemCard key={item.id}>
          <Info>
            <Name>{item.name}</Name>
            <Supplier>Supplier: {item.supplier}</Supplier>
            <Supplier>Quantity: {item.quantity}</Supplier>
          </Info>

          <Controls>
            <Button>✏️ Edit</Button>
            <Button>🗑 Delete</Button>
          </Controls>
        </ItemCard>
      ))}
    </ListWrapper>
  );
}
