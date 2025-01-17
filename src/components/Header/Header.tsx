"use client";
import React, { useState } from "react";
import { IconLogo } from "./icons";
import Link from "next/link";
import { RiMenuSearchLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { LuCircleUserRound } from "react-icons/lu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
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
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari berita disini..."
                  className="border border-gray-300 py-1 px-3 w-full rounded-lg"
                />
                <button type="submit" className="hidden"></button>
              </form>
            </div>
            <div className="flex text-3xl text-gray-700 ms-auto lg:w-[10%] items-center gap-4">
              {session ? (
                <div className="relative">
                  <Link href="/profile">
                    <Image
                      width={100}
                      height={100}
                      src={session.user.image || "/default-avatar.png"}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full  object-cover active:scale-90 transition-all duration-100"
                    />
                  </Link>
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="active:scale-90 transition-all duration-100"
                >
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
