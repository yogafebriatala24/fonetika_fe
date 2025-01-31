export async function fetchData(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
  const defaultOptions: RequestInit = {
    next: { revalidate: 60 },
    headers: {
      "Cache-Control": "public, max-age=20, stale-while-revalidate=60",
    },
  };
  const mergedOptions = { ...defaultOptions, ...options };

  const res = await fetch(url, mergedOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}: ${res.statusText}`);
  }

  const data = await res.json();
  console.log(data);

  if (!data || !data.data) {
    throw new Error("Invalid response format from API");
  }

  return data.data;
}
