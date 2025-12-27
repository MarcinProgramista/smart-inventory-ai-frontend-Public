import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledInput = styled.input`
  padding: 12px;
  border-radius: 8px;
  background: #0b0b0b;
  color: #fff;

  border: ${(p) => (p.$error ? "1px solid #ff4d4f" : "1px solid #333")};

  &:focus {
    outline: none;
    border-color: ${(p) => (p.$error ? "#ff4d4f" : "#00baff")};
  }
`;

const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 12px;
`;

export default function Input({ error, ...props }) {
  return (
    <Wrapper>
      <StyledInput {...props} $error={!!error} />
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
}
