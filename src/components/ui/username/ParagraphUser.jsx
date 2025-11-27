import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ParagraphUser = styled.p`
  position: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "relative" : "absolute"};
  left: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "" : "9999px"};
  font-size: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "1.2rem" : ""};
  border-radius: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "0.5rem" : ""};
  background: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "#000" : ""};
  color: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "#fff" : ""};
  padding: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "0.25rem" : ""};
  bottom: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "-10px" : ""};

  svg {
    margin-right: 0.25rem;
  }
`;

export default ParagraphUser;
