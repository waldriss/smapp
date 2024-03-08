import React from "react";

import ProfileStats from "./components/ProfileStats";
import ProfileInfos from "./components/ProfileInfos";
import ProfilePosts from "./components/ProfilePosts";
import ProfileHeader from "./components/ProfileHeader";
import { getUser } from "@/lib/api/serverSideRequests";
import { TUser } from "@/lib/types/user";

const ProfilePage = async({params:{profileId}}:{params:{profileId:string}}) => {
  const user:TUser=await getUser(profileId);

  return (
    <article className="pb-14 bggradient">
      <ProfileHeader  userImage={user?.userImage} />
      <ProfileStats />

      <section className="pl-[52px] pt-2 pr-12">
        <ProfileInfos name={user.name} userName={user.username} />
        <ProfilePosts />
      </section>
    </article>
  );
};

export default ProfilePage;
