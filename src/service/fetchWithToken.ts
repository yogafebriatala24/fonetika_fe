import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

const fetchWithToken = async (
  url: string,
  req: RequestInit = {},
  context?: any
) => {
  const session = await getServerSession(authOptions);

  const token = session?.user?.token;
  if (!token) {
    throw new Error("Token tidak ditemukan");
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...req.headers,
  };
  const response = await fetch(url, {
    ...req,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Request failed: `);
  }

  return response.json();
};

export default fetchWithToken;
