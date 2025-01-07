// lib/api.ts
export async function fetchDetailBerita(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/artikel/${slug}`
  );
  const data = await res.json();
  return data.data;
}
export async function fetchBeritaList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home`);
  const data = await res.json();
  return data.data.artikel_nasional;
}
