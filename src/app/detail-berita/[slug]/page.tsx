import React from "react";
import ContentDetailBerita from "./Content";
import { fetchBeritaList, fetchDetailBerita } from "@/app/libs/ApiDetailBerita";
import { notFound } from "next/navigation";
import { DetailBeritaType } from "@/app/types/DetailBerita";
import { BeritaType } from "@/app/types/BeritaType";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const detailBerita = await fetchDetailBerita(slug);
    if (detailBerita) {
      return {
        title: detailBerita.judul || "Detail Berita",
        icons: {
          icon: detailBerita.url_image,
        },
        openGraph: {
          title: detailBerita.judul || "Detail Berita",
          images: [detailBerita.url_image],
        },
        twitter: {
          card: "summary_large_image",
          title: detailBerita.judul || "Detail Berita",
          images: [detailBerita.url_image],
        },
      };
    }
  } catch (error) {
    return {
      title: "Detail Berita",
    };
  }

  return {
    title: "Detail Berita",
  };
}

export default async function DetailBerita(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  let detailBerita: DetailBeritaType | null = null;

  try {
    detailBerita = await fetchDetailBerita(slug);
  } catch (error) {
    notFound();
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
