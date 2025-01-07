export async function fetchKategori() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kategori`, {
    next: { revalidate: 30 },
  });
  const data = await res.json();
  return data.data;
}
