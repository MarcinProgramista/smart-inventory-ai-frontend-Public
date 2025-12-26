import styled from "styled-components";

/*
stock_status z backendu:
"out" | "low" | "ok" | "na"
*/

const Badge = styled.span`
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  display: inline-block;

  color: ${(p) => p.$color};
  background: ${(p) => p.$bg};
  box-shadow: 0 0 10px ${(p) => p.$glow};
`;

export default function StockBadge({ status }) {
  if (!status) return null;

  switch (status) {
    case "out":
      return (
        <Badge
          $color="#ff9d9d"
          $bg="rgba(255, 60, 60, 0.25)"
          $glow="rgba(255, 60, 60, 0.9)"
        >
          OUT
        </Badge>
      );

    case "low":
      return (
        <Badge
          $color="#ffe69d"
          $bg="rgba(255, 200, 0, 0.25)"
          $glow="rgba(255, 200, 0, 0.9)"
        >
          LOW
        </Badge>
      );

    case "na":
      return (
        <Badge
          $color="#b0b0b0"
          $bg="rgba(160, 160, 160, 0.2)"
          $glow="rgba(160, 160, 160, 0.6)"
        >
          N/A
        </Badge>
      );

    case "ok":
    default:
      return (
        <Badge
          $color="#9dffb0"
          $bg="rgba(0, 255, 150, 0.22)"
          $glow="rgba(0, 255, 150, 0.9)"
        >
          OK
        </Badge>
      );
  }
}
