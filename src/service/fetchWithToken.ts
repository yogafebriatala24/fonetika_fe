import { getSession } from "next-auth/react";

export async function fetchWithToken(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const session = await getSession();
  const token = session?.user?.token;

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  if (options.body instanceof FormData) {
    if (
      mergedOptions.headers &&
      typeof mergedOptions.headers === "object" &&
      !Array.isArray(mergedOptions.headers)
    ) {
      delete (mergedOptions.headers as Record<string, string>)["Content-Type"];
    }
  }

  const res = await fetch(url, mergedOptions);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || `Failed to fetch data from ${endpoint}`
    );
  }

  const data = await res.json();
  return data;
}
