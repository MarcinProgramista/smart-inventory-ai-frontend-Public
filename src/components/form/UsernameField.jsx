import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../common/Input";
import LabelWrapper from "../ui/LabelWrapper";
import ParagraphUser from "../ui/username/ParagraphUser";
import StyledFontAwesomeIconHideName from "../ui/username/StyledFontAwesomeIconHideName";
import StyledFontAwesomeIconInvalidName from "../ui/username/StyledFontAwesomeIconInvalidName";

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
