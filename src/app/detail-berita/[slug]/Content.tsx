"use client";
import { useState, useEffect } from "react";
import { DetailBeritaType } from "@/app/types/DetailBerita";
import { formatDate } from "@/app/utils/FormatDate";
import Image from "next/image";
import React from "react";
import { IoMdShare } from "react-icons/io";
import { ImFontSize } from "react-icons/im";
import Link from "next/link";

export default function ContentDetailBerita({
  detailBerita,
}: {
  detailBerita: DetailBeritaType;
}) {
  const [fontSize, setFontSize] = useState(16);
  const fontSizes = [14, 16, 18, 20];

  const [isFontSizePopupOpen, setIsFontSizePopupOpen] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const title = encodeURIComponent("Judul Artikel yang Akan Dibagikan");
  const [isCopied, setIsCopied] = useState(false);
  const getFontSizeLabel = (size: number) => {
    switch (size) {
      case 14:
        return "Kecil";
      case 16:
        return "Normal";
      case 18:
        return "Besar";
      case 20:
        return "Sangat Besar";
      default:
        return "Normal";
    }
  };

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(encodeURIComponent(window.location.href));
    }
  }, []);

  const increaseFontSize = () => {
    setFontSize((prevSize) => {
      const currentIndex = fontSizes.indexOf(prevSize);
      return currentIndex < fontSizes.length - 1
        ? fontSizes[currentIndex + 1]
        : prevSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => {
      const currentIndex = fontSizes.indexOf(prevSize);
      return currentIndex > 0 ? fontSizes[currentIndex - 1] : prevSize;
    });
  };

  useEffect(() => {
    if (isFontSizePopupOpen || isSharePopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFontSizePopupOpen, isSharePopupOpen]);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`,
    whatsapp: `https://api.whatsapp.com/send?text=${title}%20${currentUrl}`,
  };

  return (
    <>
      <div className="mt-6 mx-4">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl">
            {detailBerita.detail_artikel.nama}
          </h1>
          <p className="mt-2 text-gray-500 text-[14px]">
            {formatDate(detailBerita.detail_artikel.created_at)}
          </p>
          <div className="flex items-center ms-auto text-gray-500 w-fit mt-2 gap-4 border border-gray-500 rounded py-2 px-4">
            <button
              className="text-xl"
              onClick={() => setIsFontSizePopupOpen(!isFontSizePopupOpen)}
            >
              <ImFontSize />
            </button>
            <button
              className="text-2xl"
              onClick={() => setIsSharePopupOpen(!isSharePopupOpen)}
            >
              <IoMdShare />
            </button>
          </div>

          <Image
            src={detailBerita.detail_artikel.url_image}
            alt={detailBerita.detail_artikel.image}
            width={500}
            height={500}
            className="w-full h-60 object-cover mt-4"
          />
          <p className="text-center text-xs mt-1 text-gray-400">
            https://freeprik.com
          </p>
        </div>

        <div className="mt-4">
          {/* Konten dengan ukuran font dinamis */}
          <p className="text-lg" style={{ fontSize: `${fontSize}px` }}>
            {detailBerita.detail_artikel.content}
          </p>
        </div>
      </div>

      {isFontSizePopupOpen && (
        <div className="absolute bottom-0 w-full md:max-w-6xl backdrop-brightness-50 md:backdrop-brightness-100 h-screen content-end z-10">
          <div className="bg-white border shadow-md p-4">
            <div className="flex gap-4 items-center justify-center">
              <button
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                onClick={decreaseFontSize}
                disabled={fontSize === fontSizes[0]}
                style={{ opacity: fontSize === fontSizes[0] ? 0.5 : 1 }}
              >
                A-
              </button>
              <span className="">{getFontSizeLabel(fontSize)}</span>
              <button
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                onClick={increaseFontSize}
                disabled={fontSize === fontSizes[fontSizes.length - 1]}
                style={{
                  opacity:
                    fontSize === fontSizes[fontSizes.length - 1] ? 0.5 : 1,
                }}
              >
                A+
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsFontSizePopupOpen(false)}
                className="px-4 py-2 w-full bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {isSharePopupOpen && (
        <div className="absolute bottom-0 w-full md:max-w-6xl backdrop-brightness-50 md:backdrop-brightness-100 h-screen content-end z-10">
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
                onClick={() => setIsSharePopupOpen(false)}
                className="px-4 py-2 w-full bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
