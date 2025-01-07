import React from "react";
import ContentDetailBerita from "./Content";
import { fetchDetailBerita } from "@/app/api/berita/GetBerita";

export default async function DetailBerita({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const detailBerita = await fetchDetailBerita(slug);
  return (
    <>
      <ContentDetailBerita detailBerita={detailBerita} />
    </>
  );
}
export const revalidate = 10;
export const dynamicParams = true;
