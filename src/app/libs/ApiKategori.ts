export async function fetchKategori() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kategori`, {
    next: { revalidate: 30 },
    headers: {
      Accept: "application/json",
    },
  });
  const data = await res.json();
  return data.data;
}
