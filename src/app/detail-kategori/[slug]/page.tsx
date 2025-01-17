import { fetchDetailKategori } from "@/service/ApiKategori";
import { KategoriListType } from "@/types/KategoriListType";
import { notFound } from "next/navigation";
import React from "react";
import ContentDetailKategori from "./Content";

type Params = Promise<{ slug: string }>;

export default async function DetailKategori(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  let listKategori: KategoriListType[] | null = null;

  try {
    listKategori = await fetchDetailKategori(slug);
  } catch (error) {
    notFound();
  }

  if (!listKategori) {
    return null;
  }
  return (
    <>
      <ContentDetailKategori listKategori={listKategori} />
    </>
  );
}
