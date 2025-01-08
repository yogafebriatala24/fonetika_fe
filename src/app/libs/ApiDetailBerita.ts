export function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const fetchOptions = {
    ...options,
    signal: controller.signal,
  };

  return fetch(url, fetchOptions).finally(() => clearTimeout(id));
}
export function fetchDetailBerita(slug: string): Promise<any> {
  return fetchWithTimeout(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/artikel/${slug}`,
    { next: { revalidate: 10 } },
    10000
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch detail berita: ${res.statusText}`);
      }

      return res.json();
    })
    .then((data) => {
      if (!data || !data.data) {
        throw new Error(`Invalid response format for slug: ${slug}`);
      }

      return data.data;
    })
    .catch((error) => {
      console.error(`Error in fetchDetailBerita for slug ${slug}:`, error);
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
