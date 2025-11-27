import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledFontAwesomeIconInvalidPasswordConfirm = styled(FontAwesomeIcon)`
  display: ${({ $validMatch, $matchPwd }) =>
    $validMatch || !$matchPwd ? "none" : ""};
  color: ${({ $validMatch, $matchPwd }) =>
    $validMatch || !$matchPwd ? "" : "red"};
  margin-left: ${({ $validMatch, $matchPwd }) =>
    $validMatch || !$matchPwd ? "0.25rem" : ""};
`;

export default StyledFontAwesomeIconInvalidPasswordConfirm;
