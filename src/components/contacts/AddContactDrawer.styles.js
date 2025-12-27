import styled from "styled-components";
import NeonCardBright from "../ui/NeonCardBright";

/* -------------------------- BACKDROP -------------------------- */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 9998;
  display: ${(p) => (p.open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

/* -------------------------- MODAL -------------------------- */

const ModalBox = styled(NeonCardBright)`
  width: 520px;
  max-width: 95%;
  padding: 2.4rem;
  position: relative;
  overflow: visible !important;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 18px;
  right: 18px;

  svg {
    width: 26px;
    height: 26px;
    stroke: #9deaff;
  }
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
