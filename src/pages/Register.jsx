import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
import BackgroundImage from "../components/layout/BackgroundImage";
import DarkLayer from "../components/layout/DarkLayer";
import GlowOverler from "../components/layout/GlowOverlay";
import NeonCard from "../components/ui/NeonCard";
import Logo from "../components/ui/Logo";
import UsernameField from "../components/form/UsernameField";
import Input from "../components/common/Input";
import EmailField from "../components/form/EmailField";
import PasswordField from "../components/form/PasswordField";
import ConfirmPasswordField from "../components/form/ConfirmPasswordField";
import Title from "../components/ui/typography/Title";
import SmallText from "../components/ui/typography/SmallText";
import CreateButton from "../components/ui/buttons/CreateButton";
import FeatureList from "../components/ui/lists/FeatureList";
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

  return (
    <>
      {/* TWOJE TLO - BEZ ZMIAN */}
      <BackgroundImage />
      <DarkLayer />

      <GlowOverler />
      <NeonCard>
        <Logo>SmartInventoryAI</Logo>

        <Title>Create your account</Title>
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

        <CreateButton>CREATE ACCOUNT</CreateButton>

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
  );
}
