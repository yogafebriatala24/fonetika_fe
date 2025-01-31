import { IconLine } from "@/app/assets/icons";
import BuatBerita from "@/components/Profile/BuatBerita";
import { fetchKategori } from "@/service/ApiKategori";
import { KategoriListType } from "@/types/KategoriListType";

import React from "react";

export default async function CreateBerita() {
  const listKategori: KategoriListType[] = await fetchKategori();
  return (
    <>
      <div className="mt-[90px] mx-4 lg:mx-0">
        <h1 className="font-semibold text-xl text-primary">
          Yuk Berbagi Informasi
        </h1>
        <IconLine />
        <BuatBerita listKategori={listKategori} />
      </div>
    </>
  );
}
