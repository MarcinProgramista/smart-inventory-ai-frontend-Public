// src/components/ui/buttons/NeonButton.jsx
import styled, { css } from "styled-components";

const sizeStyles = {
  sm: css`
    padding: 8px 12px;
    font-size: 0.8rem;
    border-radius: 8px;
  `,
  md: css`
    padding: 12px 16px;
    font-size: 0.95rem;
    border-radius: 10px;
  `,
  lg: css`
    padding: 14px 20px;
    font-size: 1.05rem;
    border-radius: 12px;
  `,
};

const NeonButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["secondary", "width", "size"].includes(prop),
})`
  &&& {
    width: ${(p) => p.width || "auto"};
    flex: ${(p) => (p.width ? "0 0 auto" : "1")};

    ${(p) => sizeStyles[p.size || "md"]};

    border: 1px solid rgba(0, 200, 255, 0.35);
    background: ${(p) =>
      p.secondary ? "rgba(0, 0, 0, 0.35)" : "rgba(0, 170, 255, 0.22)"};

    color: #9deaff;
    font-weight: 600;
    letter-spacing: 0.05em;

    cursor: pointer;
    text-shadow: 0 0 6px rgba(0, 200, 255, 0.35);
    transition: all 0.18s ease-in-out;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;

    box-shadow:
      0 0 12px rgba(0, 200, 255, 0.4),
      inset 0 0 8px rgba(0, 200, 255, 0.25);

    svg {
      width: 18px;
      height: 18px;
      stroke: #9deaff;
      filter: drop-shadow(0 0 4px rgba(0, 200, 255, 0.9));
    }

    &:hover:not(:disabled) {
      background: rgba(0, 180, 255, 0.45);
      box-shadow:
        0 0 18px rgba(0, 200, 255, 0.75),
        inset 0 0 14px rgba(0, 200, 255, 0.35);
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.35;

      background: rgba(0, 40, 60, 0.6);
      border-color: rgba(0, 200, 255, 0.15);

      box-shadow: none;
      text-shadow: none;

      svg {
        opacity: 0.5;
        filter: none;
      }
    }
  }
`;

export default NeonButton;
