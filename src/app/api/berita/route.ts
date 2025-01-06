import axiosInstance from "@/app/libs/axiosIntance";
import { BeritaType } from "@/app/types/BeritaType";

export const fetchBeritaList = async (): Promise<BeritaType[]> => {
  const response = await axiosInstance.get("/home");
  console.log(response?.data.data.artikel_nasional);
  return response?.data.data.artikel_nasional;
};

export async function fetchDetailBerita(query: string): Promise<BeritaType> {
  const response = await axiosInstance.get(`/artikel-data?${query}`);
  console.log(response.data);
  return response.data;
}
