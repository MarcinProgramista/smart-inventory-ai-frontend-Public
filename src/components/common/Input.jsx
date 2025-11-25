import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 18px;

  border-radius: 10px;
  border: 1px solid rgba(0, 200, 255, 0.25);
  background: rgba(0, 0, 0, 0.25);

  color: #c2f7ff;
  font-size: 16px;

  box-shadow: inset 0 0 15px rgba(0, 150, 255, 0.2);

  &:focus {
    outline: none;
    border-color: #00c6ff;
    box-shadow: 0 0 18px #00c6ff;
  }
`;

export default Input;
