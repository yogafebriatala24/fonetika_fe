import ProfilePage from "@/components/Profile/ProfilePage";
import React from "react";
import { IconLine } from "../../assets/icons";
import { ArtikelListType } from "@/types/ArtikelType";
import { fetchBeritaList } from "@/service/ApiDetailBerita";
import BeritaTerbaru from "@/components/BeritaTerbaru/BeritaTerbaru";

export default async function Profile() {
  const listBerita: ArtikelListType = await fetchBeritaList();
  return (
    <>
      <ProfilePage />
      <div className="mt-4 mx-4">
        <h1 className="font-semibold text-xl text-primary">Kumpulan Tulisan</h1>
        <IconLine />
        <div className="mt-4">
          <BeritaTerbaru initialListBerita={listBerita} />
        </div>
      </div>
    </>
  );
}
