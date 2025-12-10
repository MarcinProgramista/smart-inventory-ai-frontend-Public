import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Display = styled.div`
  padding: 0.8rem 1rem;
  background: rgba(0, 40, 70, 0.55);
  border-radius: 12px;
  border: 1px solid rgba(0, 200, 255, 0.35);
  color: #9deaff;
  cursor: pointer;
  user-select: none;

  box-shadow:
    0 0 14px rgba(0, 200, 255, 0.4),
    inset 0 0 12px rgba(0, 200, 255, 0.15);

  &:hover {
    border-color: #00c8ff;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;

  max-height: 220px;
  overflow-y: auto;

  background: rgba(0, 70, 110, 0.95); /* 🔥 JASNE TŁO LISTY */
  backdrop-filter: blur(8px);

  border-radius: 12px;
  border: 1px solid rgba(0, 200, 255, 0.45);

  box-shadow: 0 0 24px rgba(0, 200, 255, 0.6);

  z-index: 999999; /* 🔥 NAD WSZYSTKIM – TERAZ BĘDZIE WIDOCZNE */
`;

const Item = styled.div`
  padding: 0.7rem 1rem;
  cursor: pointer;
  color: #9deaff;

  &:hover {
    background: rgba(0, 200, 255, 0.25);
    color: #fff;
  }
`;

export default function NeonDropdown({
  value,
  onChange,
  options = [],
  placeholder = "Select…",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const currentLabel =
    options.find((opt) => opt.value == value)?.label || placeholder;

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
      <Display onClick={() => setOpen((o) => !o)}>{currentLabel}</Display>

      {open && (
        <DropdownList>
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
        </DropdownList>
      )}
    </Wrapper>
  );
}
