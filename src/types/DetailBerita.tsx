import { ArtikelListType, ArtikelTerkaitType } from "./ArtikelType";
import { UserType } from "./UserType";

export interface DetailBeritaType {
  detail_artikel: {
    nama: string;
    content: string;
    image: string;
    created_at: string;
    updatedAt: string;
    slug: string;
    url_image: string;
    user: UserType;
  };
  artikel_terkait: ArtikelListType;
  sudah_like: boolean;
}
