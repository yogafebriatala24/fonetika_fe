import { fetchDetailBerita } from "@/app/api/berita/GetBerita";
import ContentDetailBerita from "./Content";

interface DetailBeritaProps {
  params: {
    slug: string;
  };
}

export default async function DetailBerita({ params }: DetailBeritaProps) {
  const { slug } = params;

  const detailBerita = await fetchDetailBerita(slug);

  return (
    <>
      <ContentDetailBerita detailBerita={detailBerita} />
    </>
  );
}

export const revalidate = 10;
