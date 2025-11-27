import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledFontAwesomeIconHideEmail = styled(FontAwesomeIcon)`
  color: ${({ $validEmail }) => ($validEmail ? "limegreen" : "")};
  margin-left: ${({ $validEmail }) => ($validEmail ? "0.25rem" : "")};
  display: ${({ $validEmail }) => ($validEmail ? "" : "none")};
`;

export default StyledFontAwesomeIconHideEmail;
