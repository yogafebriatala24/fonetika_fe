import SignInPage from "@/components/signin/SigninPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Signin | Dashboard  Admin Canon",
  description: "This is web canon",
};

export default function SignIn() {
  return (
    <>
      <SignInPage />
    </>
  );
}
