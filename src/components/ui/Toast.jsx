import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
    from {transform: translateY(20px); opacity: 0;}
    to { transform: translateY(0); opacity:1;}
`;

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 1rem 1.4rem;
  border-radius: 12px;
  color: #9deaff;
  font-size: 1rem;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 200, 255, 0.35);

  background: ${({ type }) =>
    type === "success" ? "rgba(0, 255, 180, 0.25" : "rgba(255, 60, 60, 0.25)"};

  box-shadow: 0 0 15px
    ${({ type }) =>
      type === "success" ? "rgba(0, 255, 180, 0.4)" : "rgba(255, 80, 80, 0.4)"};
  animation: ${slideIn} 0.3s ease;
  z-index: 9999;
`;
export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return <ToastWrapper type={type}>{message}</ToastWrapper>;
}
