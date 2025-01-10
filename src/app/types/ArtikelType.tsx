export interface ArtikelType {
  nama: string;
  deskripsi: string;
  image: string;
  kategori: {
    slug: string;
    nama: string;
    created_at: string;
    updatedAt: string;
  };
  user: {
    name: string;
    phone: string;
    image: string;
    email: string;
    created_at: string;
    updatedAt: string;
  };
  slug: string;
  url_image: string;
}
