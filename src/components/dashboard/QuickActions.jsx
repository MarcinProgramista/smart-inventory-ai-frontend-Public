import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItemModal from "../items/AddItemModal";

const ActionsWrapper = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const ActionCard = styled.button`
  background: rgba(0, 0, 0, 0.35);
  border-radius: 14px;
  padding: 1.5rem;
  border: 1px solid rgba(157, 234, 255, 0.3);
  backdrop-filter: blur(6px);
  color: #9deaff;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  &:hover {
    background: rgba(0, 0, 0, 0.55);
    transform: translateY(-3px);
    border-color: #9deaff;
  }
`;

export default function QuickActions() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ActionsWrapper>
        <ActionCard onClick={() => navigate("/items")}>
          📋 View Items
        </ActionCard>

        <ActionCard onClick={() => setOpenModal(true)}>➕ Add Item</ActionCard>

        <ActionCard onClick={() => navigate("/items/incoming")}>
          📦 Add Stock
        </ActionCard>

        <ActionCard onClick={() => navigate("/items/outgoing")}>
          📤 Remove Stock
        </ActionCard>
      </ActionsWrapper>

      {openModal && <AddItemModal onClose={() => setOpenModal(false)} />}
    </>
  );
}
