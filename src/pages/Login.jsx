import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import NeonUserIcon from "../components/icons/NeonUserIcon";
import BackgroundImage from "../components/layout/BackgroundImage";
import ButtonRow from "../components/layout/ButtonRow";
import Logo from "../components/ui/Logo";
import NeonCard from "../components/ui/NeonCard";
import ParagraphError from "../components/ui/typography/ParagraphError";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/ui/typography/Title";
import API_CONFIG from "../config/api";
import Input from "../components/common/Input";
import LabelWrapper from "../components/ui/LabelWrapper";
import CreateButton from "../components/ui/buttons/CreateButton";
import StyledLink from "../components/ui/buttons/StyledLink";
import Button from "../components/ui/buttons/Button";
import SmallText from "../components/ui/typography/SmallText";
import FeatureList from "../components/ui/lists/FeatureList";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const controller = new AbortController();

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  return (
    <>
      <BackgroundImage />
      <NeonCard>
        <ButtonRow>
          <NeonUserIcon />
          <Logo>SmartInventoryAI</Logo>
        </ButtonRow>
        <ParagraphError ref={errRef} $errMsg={errMsg} aria-live="assertive">
          {errMsg}
        </ParagraphError>
        <Title>Log in</Title>
        <form>
          <LabelWrapper htmlFor="email">Email:</LabelWrapper>
          <Input
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="name@example.com"
          />
          <LabelWrapper htmlFor="password">Password:</LabelWrapper>
          <Input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            placeholder="put password"
          />
          <CreateButton>Log in</CreateButton>
        </form>
        <SmallText>
          Need account?<a href="/register"> Register</a>
        </SmallText>
        <FeatureList>
          <li>✔ Track inventory in real time</li>
          <li>✔ Predict shortages with AI</li>
          <li>✔ Generate smart reports</li>
        </FeatureList>
      </NeonCard>
    </>
  );
};

export default Login;
