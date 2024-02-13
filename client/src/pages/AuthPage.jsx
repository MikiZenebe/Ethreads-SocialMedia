import React from "react";
import { SignupCard, LoginCard } from "../components";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { APIEndPoint } from "../baseUrl";

export default function AuthPage() {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(APIEndPoint);

  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
}
