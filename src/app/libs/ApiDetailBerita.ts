import { BeritaType } from "../types/BeritaType";
import { DetailBeritaType } from "../types/DetailBerita";

export async function fetchDetailBerita(
  slug: string
): Promise<DetailBeritaType> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/artikel/${slug}`,
    {
      next: { revalidate: 30 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch detail berita: ${res.statusText}`);
  }

  const data = await res.json();

  if (!data || !data.data) {
    throw new Error("Invalid API response");
  }

  return data.data;
}

export async function fetchBeritaList(): Promise<BeritaType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch berita list: ${res.statusText}`);
  }

  const data = await res.json();

  console.log(data);

  if (!data || !data.data || !data.data.artikel_nasional) {
    throw new Error("Invalid response format from API");
  }

  return data.data.artikel_nasional;
}
