import { useEffect, useRef, useState } from "react";
import BackgroundImage from "../components/layout/BackgroundImage";
import DarkLayer from "../components/layout/DarkLayer";
import GlowOverler from "../components/layout/GlowOverlay";
import NeonCard from "../components/ui/NeonCard";
import Logo from "../components/ui/Logo";
import UsernameField from "../components/form/UsernameField";
import EmailField from "../components/form/EmailField";
import PasswordField from "../components/form/PasswordField";
import ConfirmPasswordField from "../components/form/ConfirmPasswordField";
import Title from "../components/ui/typography/Title";
import SmallText from "../components/ui/typography/SmallText";
import CreateButton from "../components/ui/buttons/CreateButton";
import FeatureList from "../components/ui/lists/FeatureList";
import axios from "axios";
import API_CONFIG from "../config/api";
import Button from "../components/ui/buttons/Button";
import ParagraphError from "../components/ui/typography/ParagraphError";
import StyledLink from "../components/ui/buttons/StyledLink";
import NeonUserIcon from "../components/icons/NeonUserIcon";
import ButtonRow from "../components/layout/ButtonRow";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Register() {
  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setvalidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setvalidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, email, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.REGISTER}`,
        JSON.stringify({
          name: user,
          password: pwd,
          password2: matchPwd,
          email: email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setEmail("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <>
          <NeonCard>
            <Title>Success!</Title>
            <StyledLink to="/login">
              <Button>Log In</Button>
            </StyledLink>
          </NeonCard>
        </>
      ) : (
        <>
          <NeonCard>
            <ButtonRow>
              <NeonUserIcon />
              <Logo>SmartInventoryAI</Logo>
            </ButtonRow>

            <ParagraphError ref={errRef} $errMsg={errMsg} aria-live="assertive">
              {errMsg}
            </ParagraphError>
            <Title>Create your account</Title>
            <form onSubmit={handleSubmit}>
              <UsernameField
                user={user}
                setUser={setUser}
                validName={validName}
                userFocus={userFocus}
                setUserFocus={setUserFocus}
                userRef={userRef}
              />
              <EmailField
                email={email}
                setEmail={setEmail}
                validEmail={validEmail}
                setEmailFocus={setEmailFocus}
                emailFocus={emailFocus}
                emailRef={emailRef}
              />

              <PasswordField
                validPwd={validPwd}
                pwd={pwd}
                setPwd={setPwd}
                setEmailFocus={setPwdFocus}
                pwdFocus={pwdFocus}
                setPwdFocus={setPwdFocus}
              />
              <ConfirmPasswordField
                validMatch={validMatch}
                matchPwd={matchPwd}
                setMatchPwd={setMatchPwd}
                setMatchFocus={setMatchFocus}
                matchFocus={matchFocus}
              />

              <CreateButton
                disabled={
                  !validName || !validPwd || !validMatch || !validEmail
                    ? true
                    : false
                }
              >
                CREATE ACCOUNT
              </CreateButton>
            </form>
            <SmallText>
              Already have an account? <a href="/login">Log in</a>
            </SmallText>

            <FeatureList>
              <li>✔ Track inventory in real time</li>
              <li>✔ Predict shortages with AI</li>
              <li>✔ Generate smart reports</li>
            </FeatureList>
          </NeonCard>
        </>
      )}
    </>
  );
}
