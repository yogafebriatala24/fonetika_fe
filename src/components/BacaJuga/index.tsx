import React from "react";
import Image from "next/image";
import Link from "next/link";

type BacaJugaProps = {
  article: {
    slug: string;
    nama: string;
    url_image: string;
  };
};

export default function BacaJuga({ article }: BacaJugaProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <div className="mt-6 mb-4 text-[14px] bg-slate-50 rounded px-2 py-3 flex gap-2">
        <div className="">
          <Link
            href={`/detail-berita/${article.slug}`}
            className="font-semibold  "
          >
            Baca juga:{" "}
            <span className="text-primary underline"> {article.nama}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
