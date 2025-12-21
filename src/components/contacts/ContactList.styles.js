import styled from "styled-components";

export const SortableTh = styled(Th)`
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: #ffffff;
    text-shadow: 0 0 6px rgba(0, 200, 255, 0.9);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 200, 255, 0.9);
    border-radius: 6px;
  }

  ${({ active }) =>
    active &&
    `
    color: #ffffff;
    text-shadow:
      0 0 8px rgba(0, 200, 255, 1),
      0 0 16px rgba(0, 200, 255, 0.7);
  `}
`;
