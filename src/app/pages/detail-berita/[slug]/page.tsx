import React from "react";
import ContentDetailBerita from "./Content";
import { fetchDetailBerita } from "@/app/api/berita/GetBerita";

interface DetailBeritaProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function DetailBerita(props: DetailBeritaProps) {
  const params = await props.params;
  const { slug } = params;

  const detailBerita = await fetchDetailBerita(slug);
  return (
    <>
      <ContentDetailBerita detailBerita={detailBerita} />
    </>
  );
}
export const revalidate = 10;
export const dynamicParams = true;
