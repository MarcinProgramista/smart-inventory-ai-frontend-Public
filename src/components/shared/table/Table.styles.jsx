import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 2rem;
  color: #9deaff;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
export const TableWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  overflow-y: auto;
  max-height: calc(100vh - 250px);
`;
export const ActionButton = styled.button`
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid
    ${(p) => (p.$delete ? "rgba(255,80,80,0.6)" : "rgba(0,200,255,0.6)")};
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;

  margin-right: 6px;

  svg {
    stroke: ${(p) => (p.$delete ? "#ff6b6b" : "#9deaff")};
  }
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 12px 16px;
  font-weight: 600;
  color: #9deaff;
  border-bottom: 1px solid rgba(0, 200, 255, 0.15);
  background: rgba(0, 20, 40, 0.75);
  position: sticky;
  top: 0;
  text-align: ${(p) => (p.$right ? "right" : "left")};
`;

export const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 200, 255, 0.08);
  color: #c9eaff;
  text-align: ${(p) => (p.$right ? "right" : "left")};
`;

export const Tr = styled.tr`
  &:hover {
    background: rgba(0, 120, 200, 0.1);
  }
`;
