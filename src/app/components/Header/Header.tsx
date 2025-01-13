"use client";
import React, { useState } from "react";
import { IconLogo } from "./icons";
import Link from "next/link";
import { RiMenuSearchLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { LuCircleUserRound } from "react-icons/lu";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
            <div className="flex text-3xl text-gray-700 ms-auto items-center gap-4">
              <Link href="/login">
                <LuCircleUserRound />
              </Link>
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
