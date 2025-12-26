import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  opacity: 0.9;
  margin: 0.5rem 0 0.75rem;
`;

const Title = styled.span`
  font-weight: 600;
  letter-spacing: 0.04rem;
  opacity: 0.85;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  opacity: ${(p) => (p.$active ? 1 : 0.6)};
  font-weight: ${(p) => (p.$active ? 700 : 400)};

  &:hover {
    opacity: 1;
  }
`;
const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${(p) => p.$bg};
  box-shadow: 0 0 6px ${(p) => p.$glow};
`;

export default function StockLegend({ value, onChange, counts }) {
  const toggle = (v) => onChange(value === v ? "" : v);
  return (
    <Wrapper>
      <Title>Stock Status:</Title>
      <Item $active={value === "out"} onClick={() => toggle("out")}>
        <Dot $bg="rgba(255, 60, 60, 0.6)" $glow="rgba(255, 60,60, 0.9)" />
        OUT ({counts.out})
      </Item>
      <Item $active={value === "low"} onClick={() => toggle("low")}>
        <Dot $bg="rgba(255,200,0,0.6)" $glow="rgba(255,200, 0,0.9)" />
        LOW ({counts.low})
      </Item>
      <Item $active={value === "ok"} onClick={() => toggle("ok")}>
        <Dot $bg="rgba(0,255,150,0.6)" $glow="rgba(0,255,150,0.9)" />
        OK ({counts.ok})
      </Item>
      <Item $active={value === "na"} onClick={() => toggle("na")}>
        <Dot $bg="rgba(160,160,160,0.5)" $glow="rgba(160,160,160,0.7)" />
        N/A ({counts.na})
      </Item>
    </Wrapper>
  );
}
