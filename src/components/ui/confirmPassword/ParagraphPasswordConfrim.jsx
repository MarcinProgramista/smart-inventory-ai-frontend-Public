import styled from "styled-components";

const ParagraphPasswordConfrim = styled.p`
  position: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "relative" : "absolute"};
  left: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "" : "9999px"};
  font-size: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "0.75rem" : ""};
  border-radius: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "0.5rem" : ""};
  background: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "#000" : ""};
  color: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "#fff" : ""};
  padding: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "0.25rem" : ""};
  bottom: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "-10px" : ""};
  svg {
    margin-right: 0.25rem;
  }
`;

export default ParagraphPasswordConfrim;
