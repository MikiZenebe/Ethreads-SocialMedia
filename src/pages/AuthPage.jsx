import React from "react";
import { SignupCard, LoginCard } from "../components";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";

export default function AuthPage() {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
}
