"use client";
import { useState, useEffect } from "react";
import { DetailBeritaType } from "@/app/types/DetailBerita";
import { formatDate } from "@/app/utils/FormatDate";
import Image from "next/image";
import React from "react";
import { IoMdShare } from "react-icons/io";
import { ImFontSize } from "react-icons/im";

export default function ContentDetailBerita({
  detailBerita,
}: {
  detailBerita: DetailBeritaType;
}) {
  const [fontSize, setFontSize] = useState(16);
  const [isFontSizePopupOpen, setIsFontSizePopupOpen] = useState(false);

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize));
  };

  useEffect(() => {
    if (isFontSizePopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFontSizePopupOpen]);

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
            <button className="text-2xl">
              <IoMdShare />{" "}
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
        <div className="absolute bottom-0 w-full md:max-w-6xl backdrop-brightness-50 md:backdrop-brightness-100 h-screen content-end  z-10">
          <div className=" bg-white border shadow-md  p-4">
            <div className="flex gap-4 items-center justify-center">
              <button
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                onClick={decreaseFontSize}
              >
                A-
              </button>
              <span className="">{fontSize}px</span>
              <button
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                onClick={increaseFontSize}
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
    </>
  );
}
