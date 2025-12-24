import styled from "styled-components";

const Badge = styled.span`
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;

  color: ${(p) => p.color};
  background: ${(p) => p.$bg};
  box-shadow: 0 0 10px ${(p) => p.$glow};
`;

export default function StockBadge({ status }) {
  if (status === 0) {
    return (
      <Badge
        color="#ff9d9d"
        $bg="rgba(255,60,60,.25)"
        $glow="rgba(255,60,60,.9)"
      >
        OUT
      </Badge>
    );
  }

  if (status === 1) {
    return (
      <Badge
        color="#ffe69d"
        $bg="rgba(255,200,0,.25)"
        $glow="rgba(255,200,0,.9)"
      >
        LOW
      </Badge>
    );
  }

  if (status === 3) {
    return (
      <Badge
        color="#b0b0b0"
        $bg="rgba(160,160,160,.2)"
        $glow="rgba(160,160,160,.6)"
      >
        N/A
      </Badge>
    );
  }

  return (
    <Badge color="#9dffb0" $bg="rgba(0,255,150,.22)" $glow="rgba(0,255,150,.9)">
      OK
    </Badge>
  );
}
