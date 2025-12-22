import styled from "styled-components";
import NeonSelect from "../ui/selects/NeonSelect";

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

export default function EntityFilter({
  items = [],
  value,
  onChange,
  allLabel = "ALL",
  width = "200px",
}) {
  const options = [
    { value: "", label: allLabel },
    ...items.map((i) => ({
      value: i.id,
      label: i.name,
    })),
  ];

  return (
    <NeonSelect
      options={options}
      value={value}
      onChange={onChange}
      width={width}
      size="sm"
    />
  );
}
