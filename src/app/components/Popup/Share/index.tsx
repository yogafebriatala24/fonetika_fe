"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function SharePopup({ isOpen, onClose, title }: SharePopupProps) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(encodeURIComponent(window.location.href));
    }
  }, []);

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(decodeURIComponent(currentUrl)).then(() => {
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
      className={`fixed inset-0 z-50 ${!isOpen ? "hidden" : ""}`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="absolute bottom-0 w-full lg:max-w-6xl">
        <div className="bg-white border shadow-md p-4">
          <h2 className="text-center text-lg font-bold mb-4">Bagikan ke:</h2>
          <div className="flex gap-4 justify-center">
            <Link
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Facebook
            </Link>
            <Link
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              Twitter
            </Link>
            <Link
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800"
            >
              WhatsApp
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
      </div>
    </div>
  );
}
