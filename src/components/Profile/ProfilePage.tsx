"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function ProfilePage() {
  const { data: session } = useSession();
  console.log(session);
  const handleCreateBerita = () => {
    window.location.href = "/profile/create-berita";
  };

  return (
    <>
      <div className="mt-[60px]">
        <div className="bg-white relative shadow rounded">
          <Image
            src={session?.user?.sampul_url || "/sampul.png"}
            width={700}
            height={100}
            alt="profile"
            className="w-full h-[200px]  object-cover"
          />
          <div className="absolute bottom-2 right-2">
            <button className="bg-gray-400 flex active:scale-90 transition-transform  bg-opacity-60 text-xs items-center text-white gap-2 py-1 px-3 rounded-full">
              <MdAddAPhoto /> Edit Foto Sampul
            </button>
          </div>
        </div>
        <div className="-mt-3 flex items-center gap-2 justify-start ml-2">
          {session?.user.image_url ? (
            <Image
              src={session?.user.image_url}
              width={100}
              height={100}
              alt="profile"
              className="w-[90px] h-[90px] object-cover rounded-full border-4 border-white z-10"
            />
          ) : (
            <div className="w-[90px] h-[90px] bg-gray-400 rounded-full  border-4 border-white z-10">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-2xl">??</span>
              </div>
            </div>
          )}
          <div className="">
            <p className="font-medium text-l mb-1 flex items-center gap-1">
              <span>{session?.user.name}</span>
              <span className="text-primary">
                <RiVerifiedBadgeFill />
              </span>
            </p>
            <p className="font-medium text-xs text-gray-400">220 Followers</p>
          </div>
          <div className="ms-auto mx-3">
            <Link
              href="/profile/edit-profile"
              className="bg-primary flex active:scale-90 w-fit transition-transform  bg-opacity-80 text-xs items-center text-white gap-2 py-1 px-3 rounded-full"
            >
              <FaPencilAlt /> Edit Profile
            </Link>
          </div>
        </div>
        <div className="mt-1 mx-4">
          {session?.user.bio ? (
            <p className="text-xs text-gray-400 ">{session?.user.bio}</p>
          ) : (
            ""
          )}
          {session ? (
            <button
              onClick={handleCreateBerita}
              className="bg-primary w-fit mt-4 flex active:scale-90 transition-transform  bg-opacity-80 text-sm items-center text-white gap-2 py-1 px-3 rounded-full"
            >
              Mulai Menulis
            </button>
          ) : (
            <p className="text-xs mt-3  underline text-primary font-semibold">
              Laporkan pengguna?
            </p>
          )}
          <p className="text-sm mt-3  underline text-primary font-semibold">
            Laporkan pengguna?
          </p>
        </div>
      </div>
    </>
  );
}
