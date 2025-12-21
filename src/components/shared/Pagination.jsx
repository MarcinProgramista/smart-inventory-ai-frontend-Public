import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 2.5rem 0;
`;

const NeonButton = styled.button`
  padding: 0.55rem 1.4rem;
  background: rgba(0, 255, 255, 0.08);
  border: 1px solid #00eaff;
  color: #00eaff;
  font-weight: 600;
  letter-spacing: 0.05em;
  border-radius: 8px;
  cursor: pointer;
  text-shadow: 0 0 6px rgba(0, 234, 255, 0.8);
  box-shadow:
    0 0 8px rgba(0, 234, 255, 0.6),
    inset 0 0 6px rgba(0, 234, 255, 0.4);

  transition: all 0.25s ease;

  &:hover:not(:disabled) {
    background: rgba(0, 255, 255, 0.18);
    box-shadow:
      0 0 14px rgba(0, 234, 255, 1),
      inset 0 0 10px rgba(0, 234, 255, 0.7);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    box-shadow: none;
    text-shadow: none;
  }
`;

const Info = styled.span`
  color: #9deaff;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-shadow: 0 0 6px rgba(157, 234, 255, 0.6);
`;

export default function Pagination({
  page,
  totalPages,
  canPrev,
  canNext,
  onPrev,
  onNext,
}) {
  if (totalPages <= 1) return null;

  return (
    <Wrapper>
      <NeonButton disabled={!canPrev} onClick={onPrev}>
        ◀ PREV
      </NeonButton>

      <Info>
        PAGE {page} / {totalPages}
      </Info>

      <NeonButton disabled={!canNext} onClick={onNext}>
        NEXT ▶
      </NeonButton>
    </Wrapper>
  );
}
