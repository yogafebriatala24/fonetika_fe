"use client";
import { IconEmptyWrite, IconLine } from "@/app/assets/icons";
import { MyArtikelType } from "@/types/UserType";
import { formatDateSecond } from "@/utils/FormatDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ListBeritaUser({
  listBeritaUser,
}: {
  listBeritaUser: MyArtikelType;
}) {
  return (
    <div className="mt-6">
      <h1 className="font-semibold text-xl text-primary">Kumpulan Tulisan</h1>
      <IconLine />
      {listBeritaUser.data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-6">
          <IconEmptyWrite />
          <p className="mt-2 text-gray-500">Belum ada tulisan yang dibuat</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 items-center gap-2 mt-6">
          {listBeritaUser.data?.map((data) => (
            <div key={data.slug} className="col-span-12 mb-2">
              <div className="grid grid-cols-12 lg:items-center  gap-4">
                <div className="lg:col-span-3 col-span-4">
                  <Image
                    src={data.url_image}
                    alt={data.image}
                    width={100}
                    height={100}
                    className="w-full lg:h-[150px] h-[90px] object-cover rounded hover:scale-105 transition-transform ease-in-out"
                  />
                </div>
                <div className="lg:col-span-9 col-span-8">
                  <Link
                    href={`/detail-berita/${data.slug}`}
                    className="font-medium line-clamp-3 lg:text-lg active:underline"
                  >
                    {data.nama}
                  </Link>
                  <p className="mt-1 text-xs text-gray-400">
                    {formatDateSecond(data.created_at)}
                  </p>
                </div>
                <div className="col-span-12 border-b"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
