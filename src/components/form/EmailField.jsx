import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../common/Input";

export default function EmailField({
  email,
  setEmail,
  validEmail,
  setEmailFocus,
  emailFocus,
  emailRef,
}) {
  return (
    <>
      <LabelWrapper htmlFor="email">
        Email:
        <StyledFontAwesomeIconHideEmail
          icon={faCheck}
          $validEmail={validEmail}
        />
        <StyledFontAwesomeIconInvalidEmail
          icon={faTimes}
          $validEmail={validEmail}
          $email={email}
        />
      </LabelWrapper>

      <Input
        type="email"
        id="email"
        ref={emailRef}
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        aria-invalid={validEmail ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        placeholder="Put email .."
      />

      <ParagraphEmail
        id="uidnote"
        $emailFocus={emailFocus}
        $email={email}
        $validEmail={validEmail}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        username part of the email, allowing alphanumeric characters and some
        special characters like ., _, %, +, and -.
        <br />
        Must have "@" symbol that separates the username from the domain.
        <br />
        Must begin with a letter.
        <br />
        Domain part, allowing letters, digits, dots, and hyphens
        <br />
        top-level domain (TLD), which must consist of at least 2 alphabetic
        characters.
      </ParagraphEmail>
    </>
  );
}

/* … styled-components bez zmian … */

const LabelWrapper = styled.label`
  margin-top: 1rem;
  font-family: "Dancing Script", cursive;
  color: #6fe3ff;
  font-size: 24px;
  text-shadow: 0 0 20px #00baff;
`;

const StyledFontAwesomeIconHideEmail = styled(FontAwesomeIcon)`
  color: ${({ $validEmail }) => ($validEmail ? "limegreen" : "")};
  margin-left: ${({ $validEmail }) => ($validEmail ? "0.25rem" : "")};
  display: ${({ $validEmail }) => ($validEmail ? "" : "none")};
`;

const StyledFontAwesomeIconInvalidEmail = styled(FontAwesomeIcon)`
  display: ${({ $validEmail, $email }) =>
    $validEmail || !$email ? "none" : ""};
  color: ${({ $validEmail, $email }) => ($validEmail || !$email ? "" : "red")};
  margin-left: ${({ $validEmail, $email }) =>
    $validEmail || !$email ? "0.25rem" : ""};
`;

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
