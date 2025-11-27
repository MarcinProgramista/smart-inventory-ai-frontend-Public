import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../common/Input";
import LabelWrapper from "../ui/LabelWrapper";
import StyledFontAwesomeIconHidePasswordConfirm from "../ui/confirmPassword/StyledFontAwesomeIconHidePasswordConfirm";
import StyledFontAwesomeIconInvalidPasswordConfirm from "../ui/confirmPassword/StyledFontAwesomeIconInvalidPasswordConfirm";
import ParagraphPasswordConfrim from "../ui/confirmPassword/ParagraphPasswordConfrim";
const ConfirmPasswordField = ({
  validMatch,
  matchPwd,
  setMatchPwd,
  setMatchFocus,
  matchFocus,
}) => {
  return (
    <>
      <LabelWrapper htmlFor="confirm_pwd">
        Confirm Password:
        <StyledFontAwesomeIconHidePasswordConfirm
          icon={faCheck}
          $validMatch={validMatch}
          $matchPwd={matchPwd}
        />
        <StyledFontAwesomeIconInvalidPasswordConfirm
          icon={faTimes}
          $validMatch={validMatch}
          $matchPwd={matchPwd}
        />
      </LabelWrapper>
      <Input
        type="password"
        id="confirm_pwd"
        onChange={(e) => setMatchPwd(e.target.value)}
        value={matchPwd}
        required
        aria-invalid={validMatch ? "false" : "true"}
        aria-describedby="confirmnote"
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
        placeholder="Put the same password like above.. "
      />
      <ParagraphPasswordConfrim
        id="confirmnote"
        $matchFocus={matchFocus}
        $validMatch={validMatch}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        Must match the first password input field.
      </ParagraphPasswordConfrim>
    </>
  );
};

export default ConfirmPasswordField;
