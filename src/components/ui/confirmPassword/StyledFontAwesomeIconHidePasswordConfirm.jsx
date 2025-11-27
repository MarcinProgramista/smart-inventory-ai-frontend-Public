import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledFontAwesomeIconHidePasswordConfirm = styled(FontAwesomeIcon)`
  color: ${({ $validMatch, $matchPwd }) =>
    $validMatch && $matchPwd ? "limegreen" : ""};
  margin-left: ${({ $validMatch, $matchPwd }) =>
    $validMatch && $matchPwd ? "0.25rem" : ""};
  display: ${({ $validMatch, $matchPwd }) =>
    $validMatch && $matchPwd ? "" : "none"};
`;

export default StyledFontAwesomeIconHidePasswordConfirm;
