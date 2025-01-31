import { ArtikelType } from "./ArtikelType";

export interface UserType {
  name: string;
  phone: string;
  image_url: string;
  email: string;
  created_at: string;
  updatedAt: string;
  username: string;
  roles: string;
  sampul_url: string;
  bio: string;
  my_artikel: MyArtikelType;
}

export interface MyArtikelType {
  current_page: number;
  data: ArtikelType[];
  last_page: number;
  next_page_url: string;
  per_page: number;
  total: number;
}
