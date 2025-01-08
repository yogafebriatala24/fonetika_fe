export function fetchDetailBerita(slug: string): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/artikel/${slug}`, {
    next: { revalidate: 10 },
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      clearTimeout(timeoutId);
      if (!res.ok) {
        throw new Error(`Gagal mengambil detail berita: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      if (!data || !data.data) {
        throw new Error(`Format response tidak valid untuk slug: ${slug}`);
      }
      return data.data;
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      console.error(`Error di fetchDetailBerita untuk slug ${slug}:`, error);
      throw error;
    });
}

export async function fetchBeritaList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch berita list: ${res.statusText}`);
  }

  const data = await res.json();

  if (!data || !data.data || !data.data.artikel_nasional) {
    throw new Error("Invalid response format from API");
  }

  return data.data.artikel_nasional;
}
