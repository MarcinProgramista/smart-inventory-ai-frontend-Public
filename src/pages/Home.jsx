import { useContext } from "react";
import BackgroundImage from "../components/layout/BackgroundImage";
import AuthContext from "../context/AuthProvider";

export default function Home() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);

  return (
    <>
      <BackgroundImage />
    </>
  );
}
