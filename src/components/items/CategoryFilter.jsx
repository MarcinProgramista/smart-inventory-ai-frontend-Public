// src/components/items/CategoryFilter.jsx
import { useState } from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import NeonButton from "../ui/buttons/NeonButton";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 20%;
  justify-content: flex-start;
  margin: 0.75rem 0 1.25rem;
`;

const Menu = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  min-width: 220px;

  background: linear-gradient(180deg, #042a3d 0%, #031f2e 100%);

  border: 1px solid #00eaff;
  border-radius: 10px;
  list-style: none;
  padding: 0.4rem 0;
  z-index: 20;

  box-shadow:
    0 0 20px rgba(0, 234, 255, 1),
    inset 0 0 10px rgba(0, 234, 255, 0.25);
`;

const Item = styled.li`
  padding: 0.55rem 1.1rem;
  cursor: pointer;
  color: #9deaff;
  font-weight: 500;

  &:hover {
    background: rgba(0, 0, 20, 0.65);
    text-shadow: 0 0 6px rgba(157, 234, 255, 0.9);
  }
`;

export default function CategoryFilter({ categories = [], value, onChange }) {
  const [open, setOpen] = useState(false);

  const selected =
    categories.find((c) => String(c.id) === String(value))?.name ||
    "ALL CATEGORIES";

  const select = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <Wrapper>
      <NeonButton size="sm" onClick={() => setOpen((o) => !o)}>
        {selected}
        <ChevronDown size={16} />
      </NeonButton>

      {open && (
        <Menu>
          <Item onClick={() => select("")}>ALL CATEGORIES</Item>

          {categories.map((c) => (
            <Item key={c.id} onClick={() => select(c.id)}>
              {c.name}
            </Item>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}
