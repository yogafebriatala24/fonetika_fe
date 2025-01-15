import RegisterPage from "@/components/register";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Signup | Fonetika Media",
  description:
    "Silakan mendaftar untuk bisa menyerap dan berbagi informasi lebih banyak lagi",
  openGraph: {
    title: "Signup | Fonetika Media",
    description:
      "Silakan mendaftar untuk bisa menyerap dan berbagi informasi lebih banyak lagi",
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

export default function Register() {
  return <RegisterPage />;
}
