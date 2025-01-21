import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

const fetchWithToken = async (
  endpoint: string,
  req: RequestInit = {},
  context?: any
) => {
  const session = await getServerSession(authOptions);

  const token = session?.user?.token;
  console.log(token);
  if (!token) {
    throw new Error("Token tidak ditemukan");
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("Base URL tidak ditemukan");
  }

  const url = `${baseUrl}${endpoint}`;

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
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export default fetchWithToken;
