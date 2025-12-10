import { ArrowUp } from "lucide-react";
import styled from "styled-components";
import { useEffect, useState } from "react";

/* styl neonowy */
const ScrollButton = styled.button`
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 99999;
  padding: 0.9rem;
  border-radius: 50%;
  border: 1px solid rgba(0, 200, 255, 0.5);
  background: rgba(0, 40, 70, 0.8);
  color: #9deaff;
  cursor: pointer;
  backdrop-filter: blur(6px);
  box-shadow:
    0 0 12px rgba(0, 200, 255, 0.6),
    inset 0 0 10px rgba(0, 200, 255, 0.2);
  transition: 0.25s ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(10px)"};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  svg {
    width: 18px;
    height: 18px;
    stroke: #9deaff;
    filter: drop-shadow(0 0 6px rgba(0, 200, 255, 1));
  }
`;

/* helper: znajdź kontener który się scrolluje */
function detectScrollContainers() {
  const candidates = [
    document.scrollingElement || document.documentElement,
    document.body,
    document.getElementById("root"),
    document.querySelector(".app"),
    document.querySelector("main"),
    document.querySelector("#__next"),
  ].filter(Boolean);

  // wybierz te, które mają overflow i scrollHeight > clientHeight
  return candidates.filter((el) => {
    try {
      const style = getComputedStyle(el);
      const overflowY = style.overflowY;
      return (
        el.scrollHeight > el.clientHeight &&
        (overflowY === "auto" ||
          overflowY === "scroll" ||
          overflowY === "visible")
      );
    } catch {
      return false;
    }
  });
}

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    // początkowe wykrycie
    const found = detectScrollContainers();
    setContainers(
      found.length
        ? found
        : [document.scrollingElement || document.documentElement]
    );

    // nasłuchujemy na window scroll i na scroll każdego kontenera
    const onWindowScroll = () => {
      const top = (document.scrollingElement || document.documentElement)
        .scrollTop;
      setVisible(top > 250);
    };

    onWindowScroll();

    window.addEventListener("scroll", onWindowScroll, { passive: true });

    // dodatkowe nasłuchy na znalezione kontenery
    const handlers = [];
    containers.forEach((c) => {
      const fn = () => {
        setVisible(c.scrollTop > 250);
      };
      handlers.push({ c, fn });
      c.addEventListener("scroll", fn, { passive: true });
    });

    // jeśli layout się zmieni, wykryj ponownie po krótkim czasie
    const t = setTimeout(() => {
      const again = detectScrollContainers();
      if (again.length) setContainers(again);
    }, 500);

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      handlers.forEach(({ c, fn }) => c.removeEventListener("scroll", fn));
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containers.length]);

  const scrollToTop = () => {
    // przewiń każdy wykryty kontener oraz window (nadmiarowo)
    containers.forEach((c) => {
      try {
        c.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        c.scrollTop = 0;
      }
    });

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  return (
    <ScrollButton
      aria-label="Scroll to top"
      $visible={visible}
      onClick={scrollToTop}
    >
      <ArrowUp />
    </ScrollButton>
  );
}
