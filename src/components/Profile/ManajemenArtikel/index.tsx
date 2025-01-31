"use client";

import { UserType } from "@/types/UserType";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { formatDate, formatDateSecond } from "@/utils/FormatDate";

export default function ManajemenArtikelPage({
  detailUser,
}: {
  detailUser: UserType;
}) {
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
      <div className="mt-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Artikel"
            className="w-full rounded p-2 border"
          />
          <button type="submit" className="hidden"></button>
        </form>
      </div>
      <div className="bg-white mt-4 shadow rounded overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">Gambar</th>
              <th className="p-3 text-left  min-w-[150px] ">Judul</th>
              <th className="p-3 text-left min-w-[230px] ">Tanggal Upload</th>
              <th className="p-3 text-center">Like</th>
              <th className="p-3 text-center">Komentar</th>
              <th className="p-3 text-center">Kunjungan</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {detailUser.my_artikel.data.map((data) => (
              <tr key={data.slug} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <Image
                    src={data.url_image}
                    alt={data.nama}
                    width={100}
                    height={70}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-semibold max-w-[150px] truncate">
                  {data.nama}
                </td>
                <td className="p-3">{formatDate(data.created_at)}</td>
                <td className="p-3 text-center">15</td>
                <td className="p-3 text-center">2</td>
                <td className="p-3 text-center">1000</td>
                <td className="p-3">
                  <div className="flex justify-center items-center text-xl space-x-2">
                    <Link
                      href={`/detail-berita/${data.slug}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      href={`/profile/manajemen-artikel/edit-artikel/${data.slug}`}
                      className="text-primary hover:text-green-700"
                    >
                      <MdEditSquare />
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-700"
                      // Add onClick handler for delete functionality
                      // onClick={() => handleDelete(data.slug)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {detailUser.my_artikel.data.length === 0 && (
          <div className="text-center p-4 text-gray-500">
            Tidak ada artikel ditemukan
          </div>
        )}
      </div>
    </>
  );
}
