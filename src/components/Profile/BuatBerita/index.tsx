"use client";
import TextEditor from "@/components/TextEditor/TextEditor";
import React from "react";

export default function BuatBerita() {
  return (
    <>
      <div className="mt-4 bg-white p-4 shadow rounded-md ">
        <form action="">
          <div className="">
            <label htmlFor="judul">Judul Artikel</label>
            <input
              name="judul"
              type="text"
              className="w-full border mt-2 border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              placeholder="Judul"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="slug">Slug</label>
            <input
              name="slug"
              type="text"
              className="w-full border mt-2 border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              placeholder="slug"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="image">Gambar</label>
            <input
              name="image"
              type="file"
              className="w-full border mt-2 text-[13px] border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="description">Ringkasan</label>
            <input
              name="description"
              type="text"
              className="w-full border mt-2 border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              placeholder="Ringkasan artikel"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="keyword">Kata Kunci</label>
            <input
              name="keyword"
              type="text"
              className="w-full border mt-2 border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              placeholder="Keyword"
            />
          </div>

          <div className="mt-4">
            <TextEditor />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-primary rounded active:scale-90 transition-transform  text-white py-2 px-4 w-full"
            >
              Terbitkan Artikel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
