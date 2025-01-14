export async function fetchKategori() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kategori`, {
    next: { revalidate: 10 },
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=120",
    },
  });
  const data = await res.json();
  return data.data;
}
