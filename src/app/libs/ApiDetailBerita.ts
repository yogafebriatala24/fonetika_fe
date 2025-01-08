export async function fetchDetailBerita(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/artikel/${slug}`,
    {
      next: { revalidate: 30 },
    }
  );
  const data = await res.json();
  return data.data;
}

export async function fetchBeritaList() {
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
