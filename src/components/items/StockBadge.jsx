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

export default function StockBadge({ quantity, min }) {
  if (quantity === 0) {
    return (
      <Badge
        color="#ff9d9d"
        $bg="rgba(255, 60, 60, 0.25)"
        $glow="rgba(255, 60, 60, 0.9)"
      >
        OUT
      </Badge>
    );
  }

  if (quantity <= min) {
    return (
      <Badge
        color="#ffe69d"
        $bg="rgba(255, 200, 0, 0.25)"
        $glow="rgba(255, 200, 0, 0.9)"
      >
        LOW
      </Badge>
    );
  }

  return (
    <Badge
      color="#9dffb0"
      $bg="rgba(0, 255, 150, 0.22)"
      $glow="rgba(0, 255, 150, 0.9)"
    >
      OK
    </Badge>
  );
}
