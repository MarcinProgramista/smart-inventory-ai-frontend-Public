import styled from "styled-components";

const ParagraphEmail = styled.p`
  position: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "relative" : "absolute"};
  left: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "" : "9999px"};
  font-size: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "0.75rem" : ""};
  border-radius: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "0.5rem" : ""};
  background: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "#000" : ""};
  color: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "#fff" : ""};
  padding: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "0.25rem" : ""};
  bottom: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "-10px" : ""};
  svg {
    margin-right: 0.25rem;
  }
`;

export default ParagraphEmail;
