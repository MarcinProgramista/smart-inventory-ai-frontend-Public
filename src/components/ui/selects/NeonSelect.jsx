import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import NeonButton from "../buttons/NeonButton";

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: flex-start;
`;

const Menu = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 100%;
  max-height: 280px;
  overflow-y: auto;

  background: linear-gradient(180deg, #042a3d 0%, #031f2e 100%);
  border: 1px solid #00eaff;
  border-radius: 10px;

  list-style: none;
  padding: 0.4rem 0;
  margin: 0;
  z-index: 50;

  box-shadow:
    0 0 20px rgba(0, 234, 255, 1),
    inset 0 0 10px rgba(0, 234, 255, 0.25);
`;

const Item = styled.li`
  padding: 0.55rem 1.1rem;
  cursor: pointer;
  color: #9deaff;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    background: rgba(0, 0, 20, 0.65);
    text-shadow: 0 0 6px rgba(157, 234, 255, 0.9);
  }
`;

export default function NeonSelect({
  options = [],
  value,
  onChange,
  placeholder = "SELECT",
  width,
  size = "md",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected =
    options.find((o) => String(o.value) === String(value))?.label ||
    placeholder;

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <Wrapper ref={ref}>
      <NeonButton size={size} width={width} onClick={() => setOpen((o) => !o)}>
        {selected}
        <ChevronDown size={16} />
      </NeonButton>

      {open && (
        <Menu>
          {options.map((opt) => (
            <Item
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </Item>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}
