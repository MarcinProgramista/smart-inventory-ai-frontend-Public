import styled from "styled-components";

const NeonButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "secondary",
})`
  &&& {
    flex: 1;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid rgba(0, 200, 255, 0.35);
    background: ${(p) =>
      p.secondary ? "rgba(0,0,0,0.28)" : "rgba(0,170,255,0.18)"};
    color: #9deaff;
    cursor: pointer;
    text-shadow: 0 0 6px rgba(0, 200, 255, 0.25);
    transition: 0.18s ease-in-out;

    display: inline-flex;
    align-items: center;
    gap: 0.6rem;

    box-shadow:
      0 0 12px rgba(0, 200, 255, 0.4),
      inset 0 0 8px rgba(0, 200, 255, 0.25);

    svg {
      width: 20px;
      height: 20px;
      stroke: #9deaff;
      filter: drop-shadow(0 0 4px rgba(0, 200, 255, 0.9));
    }

    &:hover {
      background: rgba(0, 180, 255, 0.45);
      box-shadow:
        0 0 18px rgba(0, 200, 255, 0.7),
        inset 0 0 14px rgba(0, 200, 255, 0.35);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

export default NeonButton;
