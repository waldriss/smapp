import ExplorePost from "@/components/Generalcomponents/ExplorePost";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const ProfilePosts = () => {
  return (
    <section>
      <Tabs defaultValue="allPosts" className="w-full mt-14">
        <TabsList className="w-[400px] bg-[#1e1e29] h-14 p-0">
          <TabsTrigger className="w-1/2 h-full " value="allPosts">
            Posts
          </TabsTrigger>
          <TabsTrigger className="w-1/2 h-full " value="likedPosts">
            Liked Posts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="allPosts">
          <div className="my-14 grid grid-cols-3 gap-x-[2px] gap-y-[2px]   justify-items-center max-w-full mx-auto rounded-[50px] overflow-hidden">
            <ExplorePost subclass="!rounded-none " isprofilePage />
            <ExplorePost subclass="!rounded-none " isprofilePage />
            <ExplorePost subclass="!rounded-none " isprofilePage />
            <ExplorePost subclass="!rounded-none " isprofilePage />
            <ExplorePost subclass="!rounded-none " isprofilePage />
            <ExplorePost subclass="!rounded-none " isprofilePage />
            <ExplorePost subclass="!rounded-none " isprofilePage />
            <ExplorePost subclass="!rounded-none " isprofilePage />
            <ExplorePost subclass="!rounded-none " isprofilePage />
          </div>
        </TabsContent>
        <TabsContent value="likedPosts">
          <div className="py-14 grid grid_auto gap-x-6 gap-y-8  justify-items-center max-w-full">
            <ExplorePost />
            <ExplorePost />
            <ExplorePost />
            <ExplorePost />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProfilePosts;
