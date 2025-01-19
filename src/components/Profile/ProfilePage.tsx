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
            src={"/sampul.png"}
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
          <Image
            src={"/user.jpg"}
            width={90}
            height={90}
            alt="profile"
            className="w-[90px] h-[90px] object-cover rounded-full border-4 border-white z-10"
          />
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
            <div className="flex items-center gap-2">
              <button
                onClick={handleCreateBerita}
                className="bg-primary w-fit mt-4 flex active:scale-90 transition-transform  bg-opacity-80 text-sm items-center text-white gap-2 py-1 px-3 rounded-full"
              >
                Mulai Menulis
              </button>
              <button
                onClick={handleCreateBerita}
                className="bg-gray-600 w-fit mt-4 flex active:scale-90 transition-transform  bg-opacity-80 text-sm items-center text-white gap-2 py-1 px-3 rounded-full"
              >
                Kelola Berita
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
