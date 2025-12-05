import { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  right: 1.5rem;
  bottom: 2rem;
  z-index: 10;
  padding: 0.9rem 1.05rem;
  border-radius: 50%;
  background: rgba(0, 170, 255, 0.18);
  border: 1px solid #9deaff;
  cursor: pointer;
  font-size: 1.2rem;
  color: #9deaff;
  backdrop-filter: blur(8px);
  transition: 0.3s ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};

  /* Neon glow */
  box-shadow: 0 0 10px #9deaff, 0 0 20px rgba(157, 234, 255, 0.6);

  &:hover {
    background: rgba(0, 0, 0, 0.75);
    transform: translateY(-4px);
    box-shadow: 0 0 15px #9deaff, 0 0 30px rgba(157, 234, 255, 0.7);
  }

  /* subtle pulse */
  animation: ${({ $visible }) => ($visible ? "pulse 2.4s infinite" : "none")};

  @keyframes pulse {
    0% {
      box-shadow: 0 0 10px #9deaff;
    }
    50% {
      box-shadow: 0 0 16px #9deaff;
    }
    100% {
      box-shadow: 0 0 10px #9deaff;
    }
  }
`;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button $visible={visible} onClick={scrollToTop}>
      ↑
    </Button>
  );
}
