import React from "react";
import ContentDetailBerita from "./Content";
import { fetchBeritaList, fetchDetailBerita } from "@/app/libs/ApiDetailBerita";
import { notFound } from "next/navigation";
import { DetailBeritaType } from "@/app/types/DetailBerita";
import { BeritaType } from "@/app/types/BeritaType";

export type paramsType = Promise<{ slug: string }>;
export default async function DetailBerita(props: { params: paramsType }) {
  let detailBerita: DetailBeritaType | null = null;
  const { slug } = await props.params;

  try {
    detailBerita = await fetchDetailBerita(slug);
  } catch (error) {
    ("error");
  }
  if (!detailBerita) {
    return null;
  }

  return (
    <>
      <ContentDetailBerita detailBerita={detailBerita} />
    </>
  );
}

export async function generateStaticParams() {
  const beritaList = await fetchBeritaList();

  return beritaList.map((berita: BeritaType) => ({
    slug: berita.slug,
  }));
}
