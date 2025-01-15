"use client";
import React, { useState } from "react";
import { IconLogo } from "./icons";
import Link from "next/link";
import { RiMenuSearchLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { LuCircleUserRound } from "react-icons/lu";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Header */}
      <div className="border-b border-gray-200 bg-white w-full p-2 fixed top-0 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/">
              <IconLogo />
            </Link>
            <div className="ms-auto w-full hidden lg:block">
              <input
                type="text"
                id="search"
                placeholder="Search..."
                className="border border-gray-300 p-1 w-full rounded-lg"
              />
            </div>
            <div className="flex text-3xl text-gray-700 ms-auto lg:w-[10%] items-center gap-4">
              {session ? (
                <div className="relative">
                  <Image
                    width={100}
                    height={100}
                    src={session.user.image || "/default-avatar.png"}
                    alt={session.user.name || "User"}
                    className="w-8 h-8 rounded-full  object-cover"
                  />
                </div>
              ) : (
                <Link href="/signin">
                  <LuCircleUserRound />
                </Link>
              )}
              <button className="" onClick={toggleSidebar}>
                <RiMenuSearchLine />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Header;
