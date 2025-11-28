import styled from "styled-components";

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "secondary",
})`
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

  &:hover {
    background: rgba(0, 180, 255, 0.45);
    box-shadow: 0 6px 18px rgba(0, 140, 255, 0.12);
  }
`;

export default Button;
