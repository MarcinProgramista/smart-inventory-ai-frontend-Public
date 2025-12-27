import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
`;

export const Drawer = styled.div`
  width: 380px;
  height: 100%;
  padding: 28px;

  background: linear-gradient(
    180deg,
    rgba(10, 25, 35, 0.92),
    rgba(5, 15, 25, 0.96)
  );

  backdrop-filter: blur(12px);
  border-left: 1px solid rgba(0, 180, 255, 0.15);

  display: flex;
  flex-direction: column;
  gap: 18px;

  box-shadow:
    -8px 0 30px rgba(0, 150, 255, 0.15),
    inset 0 0 0 1px rgba(0, 180, 255, 0.05);
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: #9be7ff;

  text-shadow: 0 0 12px rgba(0, 180, 255, 0.35);
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`;

export const Footer = styled.div`
  margin-top: auto;
  padding-top: 16px;

  display: flex;
  justify-content: flex-end;
  gap: 10px;

  border-top: 1px solid rgba(0, 180, 255, 0.1);
`;
