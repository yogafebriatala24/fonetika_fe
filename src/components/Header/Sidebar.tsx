"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { LuCircleUserRound } from "react-icons/lu";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-full bg-white shadow-lg z-50 transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 mx-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">Menu</h2>
          <button className="text-2xl text-gray-700" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="p-2 mx-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Berita"
              className="w-full rounded p-2 border"
            />
            <button type="submit" className="hidden"></button>
          </form>
        </div>
        <div className="mx-4">
          <Link
            href="/"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Tentang Kami
          </Link>
          <Link
            href="/about"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Kirim Tulisan
          </Link>
          <Link
            href="/contact"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Redaksi
          </Link>
        </div>

        {/* Sidebar Bottom */}
        <div className="fixed bottom-10 mx-4 text-gray-500">
          {!session ? (
            <Link href="/signin" className="flex items-center gap-2">
              <LuCircleUserRound /> Masuk
            </Link>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="block focus:underline rounded-lg mt-4"
            >
              Keluar
            </button>
          )}

          <p className="mt-2">PT. Media Bersama-sama aja</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
