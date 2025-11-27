import styled from "styled-components";

const CreateButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  margin-top: 10px;

  border-radius: 10px;
  border: 1px solid rgba(0, 200, 255, 0.45);

  background: rgba(0, 170, 255, 0.25);
  color: #abf4ff;

  font-size: 20px;
  font-weight: 600;
  cursor: pointer;

  text-shadow: 0 0 6px rgba(0, 200, 255, 0.5);
  box-shadow: 0 0 12px rgba(0, 180, 255, 0.25);

  transition: 0.25s;

  &:hover {
    background: rgba(0, 180, 255, 0.45);
    box-shadow: 0 0 25px #00baff;
  }
`;

export default CreateButton;
