"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function ProfilePage() {
  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  return (
    <>
      <div className="mt-[90px] mx-4">
        <div className="flex flex-col items-center justify-center bg-white shadow rounded p-4">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile Image"
              width={100}
              height={100}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-white text-lg">?</span>
            </div>
          )}
          <div className="mt-2 flex items-center flex-col">
            <p className="text-lg">{session?.user?.name}</p>
            <p className="text-gray-300 text-sm">{session?.user?.email}</p>
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="mt-2 bg-gray-400 text-white text-sm px-6 py-1 rounded flex items-center gap-2"
            >
              <FaSignOutAlt /> Keluar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
