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

        <Input placeholder="Password" type="password" />
        <Input placeholder="Confirm Password" type="password" />

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

/* ---------------- STYLES ---------------- */

const Title = styled.h1`
  font-size: 42px;
  color: #ffffff;
  margin-bottom: 30px;
  line-height: 1.2;
  text-shadow: 0 0 18px rgba(0, 200, 255, 0.5);
`;

const CreateButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  margin-top: 10px;

  border-radius: 10px;
  border: 1px solid rgba(0, 200, 255, 0.45);

  background: rgba(0, 170, 255, 0.25);
  color: #abf4ff;

  font-size: 20px;
  font-weight: 600;
  cursor: pointer;

  text-shadow: 0 0 6px rgba(0, 200, 255, 0.5);
  box-shadow: 0 0 12px rgba(0, 180, 255, 0.25);

  transition: 0.25s;

  &:hover {
    background: rgba(0, 180, 255, 0.45);
    box-shadow: 0 0 25px #00baff;
  }
`;

const SmallText = styled.p`
  margin-top: 18px;
  font-size: 14px;
  opacity: 0.8;

  a {
    color: #70e4ff;
    text-shadow: 0 0 10px #00baff;
  }
`;

const FeatureList = styled.ul`
  margin-top: 35px;
  list-style: none;
  font-size: 18px;
  line-height: 2;

  color: #bfeaff;
  text-shadow: 0 0 12px rgba(0, 170, 255, 0.45);
`;
