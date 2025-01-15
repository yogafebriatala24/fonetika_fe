import { getSession } from "next-auth/react";

const fetchClient = async (url: string, options: RequestInit = {}) => {
  const session = await getSession();
  const token = session?.user.token;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default fetchClient;
