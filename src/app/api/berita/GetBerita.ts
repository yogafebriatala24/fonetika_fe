import axiosInstance from "@/app/libs/axiosIntance";
import { BeritaType } from "@/app/types/BeritaType";

export const fetchBeritaList = async (): Promise<BeritaType[]> => {
  const response = await axiosInstance.get("/home");
  return response?.data.data.artikel_nasional;
};
