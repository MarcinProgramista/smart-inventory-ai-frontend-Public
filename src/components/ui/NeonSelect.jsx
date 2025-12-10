import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Display = styled.div`
  padding: 0.8rem 1rem;
  width: 100%;
  border-radius: 12px;
  background: rgba(0, 40, 70, 0.55);
  border: 1px solid rgba(0, 200, 255, 0.35);
  color: #9deaff;
  cursor: pointer;
  box-shadow:
    0 0 14px rgba(0, 200, 255, 0.4),
    inset 0 0 12px rgba(0, 200, 255, 0.15);

  &:hover {
    border-color: rgba(0, 200, 255, 0.7);
    box-shadow:
      0 0 18px rgba(0, 200, 255, 0.7),
      inset 0 0 14px rgba(0, 200, 255, 0.35);
  }
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: rgba(0, 25, 45, 0.95);
  border-radius: 12px;
  border: 1px solid rgba(0, 200, 255, 0.35);
  box-shadow: 0 0 18px rgba(0, 200, 255, 0.4);
  z-index: 999999;

  max-height: 200px;
  overflow-y: auto;
  backdrop-filter: blur(6px);
`;

const Option = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: #9deaff;

  &:hover {
    background: rgba(0, 200, 255, 0.2);
  }
`;

export default function NeonSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Display onClick={() => setOpen(!open)}>
        {value ? options.find((o) => o.value === value)?.label : placeholder}
      </Display>

      {open && (
        <Menu>
          {options.map((o) => (
            <Option
              key={o.value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
            >
              {o.label}
            </Option>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}
