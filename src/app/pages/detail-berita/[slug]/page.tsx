import { fetchDetailBerita } from "@/app/api/berita/GetBerita";
import ContentDetailBerita from "./Content";

export default async function DetailBerita({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const detailBerita = await fetchDetailBerita(slug);

  return (
    <>
      <ContentDetailBerita detailBerita={detailBerita} />
    </>
  );
}

export const revalidate = 10;
