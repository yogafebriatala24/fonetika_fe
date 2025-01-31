import ProfilePage from "@/components/Profile/ProfilePage";
import React from "react";
import { fetchDetailUser } from "@/service/ApiUser";
import { UserType } from "@/types/UserType";
import ListBeritaUser from "@/components/Profile/ListBerita";
import { fetchFollower } from "@/service/ApiFollowers";
import { FollowerType } from "@/types/KomentarType";

type Params = Promise<{ username: string }>;

export default async function Profile(props: { params: Params }) {
  const params = await props.params;
  const username = params.username;

  const detailUser: UserType = await fetchDetailUser(username);
  const follower: FollowerType = await fetchFollower(username);
  return (
    <>
      <ProfilePage detailUser={detailUser} follower={follower} />
      <div className="mt-4 mx-4">
        <div className="mt-4">
          <ListBeritaUser listBeritaUser={detailUser.my_artikel} />
        </div>
      </div>
    </>
  );
}
