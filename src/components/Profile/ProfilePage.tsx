"use client";
import { fetchWithToken } from "@/service/fetchWithToken";
import { FollowerType } from "@/types/KomentarType";
import { UserType } from "@/types/UserType";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function ProfilePage({
  detailUser,
  follower,
}: {
  detailUser: UserType;
  follower: FollowerType;
}) {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleCreateBerita = () => {
    window.location.href = "/profile/create-berita";
  };

  const handleFollow = async () => {
    if (!session) {
      window.location.href = "/signin";
      return;
    }

    try {
      const user_uuid = detailUser.username;

      await fetchWithToken(`/followers-create?user_uuid=${user_uuid}`, {
        method: "POST",
        body: JSON.stringify({ user_uuid }),
      });
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error);
    }
  };

  const isCurrentUser = session?.user?.username === detailUser.username;

  return (
    <>
      <div className="mt-[60px]">
        <div className="bg-white relative shadow rounded">
          <Image
            src={"/sampul.png"}
            width={700}
            height={100}
            alt="profile"
            className="w-full h-[200px] object-cover"
          />
          {isCurrentUser && (
            <div className="absolute bottom-2 right-2">
              <button className="bg-gray-400 flex active:scale-90 transition-transform bg-opacity-60 text-xs items-center text-white gap-2 py-1 px-3 rounded-full">
                <MdAddAPhoto /> Edit Foto Sampul
              </button>
            </div>
          )}
        </div>
        <div className="-mt-3 flex items-center gap-2 justify-start ml-2">
          <Image
            src={detailUser.image_url || "/user.jpg"}
            width={90}
            height={90}
            alt="profile"
            className="w-[90px] h-[90px] object-cover rounded-full border-4 border-white z-10"
          />
          <div className="mt-2">
            <p className="font-medium flex items-center gap-1">
              <span>{detailUser?.name}</span>

              <span className="text-primary">
                <RiVerifiedBadgeFill />
              </span>
            </p>
            <p className="text-xs text-gray-400 mb-2">@{detailUser.username}</p>
            <p className="font-medium text-xs text-gray-400">
              {follower.total_followers} Followers
            </p>
          </div>
          <div className="ms-auto mx-3">
            {isCurrentUser ? (
              <Link
                href="/profile/kelola-profile"
                className="bg-primary flex active:scale-90 w-fit transition-transform bg-opacity-80 text-xs items-center text-white gap-2 py-1 px-3 rounded-full"
              >
                <FaPencilAlt /> Kelola Profile
              </Link>
            ) : (
              <button
                onClick={handleFollow}
                className={`bg-primary text-white flex active:scale-90 transition-transform text-xs items-center gap-2 py-1 px-3 rounded-full`}
              >
                {session ? (isFollowing ? "Unfollow" : "Follow +") : "Follow +"}
              </button>
            )}
          </div>
        </div>
        <div className="mt-1 mx-4">
          {detailUser.bio && (
            <p className="text-xs text-gray-400">{detailUser.bio}</p>
          )}
          {session && isCurrentUser && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCreateBerita}
                className="bg-primary w-fit mt-4 flex active:scale-90 transition-transform bg-opacity-80 text-sm items-center text-white gap-2 py-1 px-3 rounded-full"
              >
                Mulai Menulis
              </button>
              <Link
                href={`/profile/manajemen-artikel/${detailUser.username}`}
                className="bg-gray-600 w-fit mt-4 flex active:scale-90 transition-transform bg-opacity-80 text-sm items-center text-white gap-2 py-1 px-3 rounded-full"
              >
                Manajemen Artikel
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
