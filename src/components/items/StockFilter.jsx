import NeonButton from "../ui/buttons/NeonButton";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function StockFilter({ value, onChange }) {
  return (
    <Wrapper>
      <NeonButton secondary={value !== ""} onClick={() => onChange("")}>
        ALL
      </NeonButton>

      <NeonButton secondary={value !== "low"} onClick={() => onChange("low")}>
        LOW
      </NeonButton>

      <NeonButton secondary={value !== "out"} onClick={() => onChange("out")}>
        OUT
      </NeonButton>
    </Wrapper>
  );
}
