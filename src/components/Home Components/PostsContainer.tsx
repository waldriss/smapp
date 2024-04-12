import { getServerSideHomePosts } from "@/lib/api/serverSideRequests";
import { IPost } from "@/lib/types/Post";
import React, { Suspense } from "react";
import Posts from "../Generalcomponents/Posts";
import LoadingSvg from "../Generalcomponents/LoadingSvg";
import { auth } from "@clerk/nextjs";




const PostsContainer = async ({ userId }: { userId: string }) => {
  const {getToken}=auth()
  const token=await getToken()

  const posts: IPost[] = await getServerSideHomePosts(userId,token);
 

  return (
   
      <Posts token={token} posts={posts} userId={userId} />
    
  );
};

export default PostsContainer;
