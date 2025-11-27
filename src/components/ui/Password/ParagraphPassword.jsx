import styled from "styled-components";

const ParagraphPassword = styled.p`
  position: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "relative" : "absolute"};
  left: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "" : "9999px"};
  font-size: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "0.75rem" : ""};
  border-radius: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "0.5rem" : ""};
  background: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "#000" : ""};
  color: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "#fff" : ""};
  padding: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "0.25rem" : ""};
  bottom: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "-10px" : ""};
  svg {
    margin-right: 0.25rem;
  }
`;

export default ParagraphPassword;
