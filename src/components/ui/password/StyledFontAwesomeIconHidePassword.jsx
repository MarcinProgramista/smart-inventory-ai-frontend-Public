import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledFontAwesomeIconHidePassword = styled(FontAwesomeIcon)`
  color: ${({ $validPwd }) => ($validPwd ? "limegreen" : "")};
  margin-left: ${({ $validPwd }) => ($validPwd ? "0.25rem" : "")};
  display: ${({ $validPwd }) => ($validPwd ? "" : "none")};
`;

export default StyledFontAwesomeIconHidePassword;
