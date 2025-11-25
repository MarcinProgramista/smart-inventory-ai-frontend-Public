import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../common/Input";

export default function UsernameField({
  user,
  setUser,
  validName,
  userFocus,
  setUserFocus,
  userRef,
}) {
  return (
    <>
      <LabelWrapper htmlFor="username">
        Username:
        <StyledFontAwesomeIconHideName icon={faCheck} $validName={validName} />
        <StyledFontAwesomeIconInvalidName
          icon={faTimes}
          $validName={validName}
          $user={user}
        />
      </LabelWrapper>

      <Input
        type="text"
        id="username"
        ref={userRef}
        autoComplete="off"
        onChange={(e) => setUser(e.target.value)}
        value={user}
        required
        aria-invalid={validName ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
        placeholder="Put name ..."
      />

      <ParagraphUser
        id="uidnote"
        $userFocus={userFocus}
        $user={user}
        $validName={validName}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        4 to 24 characters.
        <br />
        Must begin with a letter.
        <br />
        Letters, numbers, underscores, hyphens allowed.
      </ParagraphUser>
    </>
  );
}

/* ---- STYLE IMPORTUJESZ TAK SAMO Z REGISTER.JSX ---- */

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

const StyledFontAwesomeIconInvalidName = styled(FontAwesomeIcon)`
  display: ${({ $validName, $user }) => ($validName || !$user ? "none" : "")};
  color: ${({ $validName, $user }) => ($validName || !$user ? "" : "red")};
  margin-left: ${({ $validName, $user }) =>
    $validName || !$user ? "0.25rem" : ""};
`;

const StyledFontAwesomeIconHideName = styled(FontAwesomeIcon)`
  color: ${({ $validName }) => ($validName ? "limegreen" : "")};
  margin-left: ${({ $validName }) => ($validName ? "0.25rem" : "")};
  display: ${({ $validName }) => ($validName ? "" : "none")};
`;

const LabelWrapper = styled.label`
  margin-top: 1rem;
  font-family: "Dancing Script", cursive;
  color: #6fe3ff;
  font-size: 24px;
  text-shadow: 0 0 20px #00baff;
`;
