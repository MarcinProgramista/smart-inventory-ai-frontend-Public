import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const StyledFontAwesomeIconInvalidPassword = styled(FontAwesomeIcon)`
  display: ${({ $validPwd, $pwd }) => ($validPwd || !$pwd ? "none" : "")};
  color: ${({ $validPwd, $pwd }) => ($validPwd || !$pwd ? "" : "red")};
  margin-left: ${({ $validPwd, $pwd }) =>
    $validPwd || !$pwd ? "0.25rem" : ""};
`;

export default StyledFontAwesomeIconInvalidPassword;
