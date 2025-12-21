import styled from "styled-components";
import NeonButton from "../ui/buttons/NeonButton";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 2.5rem 0;
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
      <NeonButton width="120px" disabled={!canPrev} onClick={onPrev}>
        ◀ PREV
      </NeonButton>

      <Info>
        PAGE {page} / {totalPages}
      </Info>

      <NeonButton width="120px" disabled={!canNext} onClick={onNext}>
        NEXT ▶
      </NeonButton>
    </Wrapper>
  );
}
