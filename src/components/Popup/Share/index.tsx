"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function SharePopup({ isOpen, onClose, title }: SharePopupProps) {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullUrl = window.location.origin + pathname;
      setCurrentUrl(fullUrl);
    }
  }, [pathname]);

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`,
    whatsapp: `https://api.whatsapp.com/send?text=${title}%20${currentUrl}`,
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 w-full lg:flex lg:inset-0 lg:items-center lg:justify-center"
      >
        <div className="bg-white border shadow-md p-4 lg:w-[500px] lg:p-6 lg:rounded rounded-t-lg">
          <h2 className="text-center text-lg font-bold mb-4">Bagikan ke:</h2>
          <div className="flex gap-4 justify-center text-4xl">
            <Link
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaFacebook />
            </Link>
            <Link
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <FaTwitter />
            </Link>
            <Link
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800"
            >
              <FaWhatsapp />
            </Link>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 w-full bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              {isCopied ? "Tautan Disalin!" : "Salin Tautan"}
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 w-full bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Tutup
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
