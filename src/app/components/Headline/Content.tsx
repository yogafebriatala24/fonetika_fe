"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Mengimpor komponen Image dari Next.js
import { BeritaType } from "@/app/types/BeritaType";

export default function ContentHeadline({
  listBerita,
}: {
  listBerita: BeritaType[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = listBerita.slice(0, 3).map((berita) => ({
    src: "/images/samsat.png",
    title: berita.nama,
    width: 1200,
    height: 500,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full relative mt-4  bg-gray-50 p-4">
      <h1 className="font-bold text-xl mb-4 text-primary">Headline</h1>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative ">
              <Image
                src={image.src}
                alt={image.title}
                width={image.width}
                height={image.height}
                className="w-full h-64 object-cover "
              />
              <div className=" absolute bottom-0  bg-primary bg-opacity-80 p-2 text-white text-xl  font-bold">
                {image.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
