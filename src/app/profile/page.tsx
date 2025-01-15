"use client";
import ProfilePage from "@/components/Profile/ProfilePage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Profile() {
  return (
    <>
      <ProfilePage />
    </>
  );
}
