import SignInPage from "@/components/signin/SigninPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Signin | Fonetika Media",
  description:
    "Silakan login untuk bisa menyerap dan berbagi informasi lebih banyak lagi",
  openGraph: {
    title: "Signin | Fonetika Media",
    description:
      "Silakan login untuk bisa menyerap dan berbagi informasi lebih banyak lagi",
    url: "https://yogafebriatala.cloud",
    siteName: "Fonetika Media",
    images: [
      {
        url: "https://yogafebriatala.cloud/logo.png",
        width: 800,
        height: 600,
      },
    ],
  },
  icons: "/logo.png",
};

export default function SignIn() {
  return (
    <>
      <SignInPage />
    </>
  );
}
