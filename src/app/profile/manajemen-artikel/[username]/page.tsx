import { IconLine } from "@/app/assets/icons";
import ManajemenArtikelPage from "@/components/Profile/ManajemenArtikel";
import { fetchDetailUser } from "@/service/ApiUser";
import { UserType } from "@/types/UserType";
import React from "react";

type Params = Promise<{ username: string }>;
export default async function ManajemenArtikel(props: { params: Params }) {
  const params = await props.params;
  const username = params.username;

  const detailUser: UserType = await fetchDetailUser(username);
  return (
    <>
      <div className="mt-[80px] mx-4 lg:mx-0">
        <h1 className="font-semibold text-xl text-primary">
          Manajemen Artikel
        </h1>
        <IconLine />
        <ManajemenArtikelPage detailUser={detailUser} />
      </div>
    </>
  );
}
