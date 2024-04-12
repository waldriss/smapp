import Image from "next/image";
import Posts from "@/components/Generalcomponents/Posts";
import TopAccounts from "@/components/Home Components/TopAccounts";
import { auth } from "@clerk/nextjs";

import { IPost } from "@/lib/types/Post";
import { TopUser } from "@/lib/types/user";
import PostsContainer from "@/components/Home Components/PostsContainer";
import TopAccountsContainer from "@/components/Home Components/TopAccountsContainer";
import LoadingSvg from "@/components/Generalcomponents/LoadingSvg";
import { Suspense } from "react";
import {  Users } from "lucide-react";
import HomeHeader from "@/components/Home Components/HomeHeader";



export default async function Home() {
  const {sessionClaims}=auth()
  
  let posts: IPost[] = [];
  let TopUsers: TopUser[] = [];
 
 
  const LoadingPosts = (
    <div className="h-screen min-w-[65%] w-[65%] ">
      <LoadingSvg className="h-28 w-28 mt-20 " />
    </div>
  );
  const LoadingTopAccounts = (
    <div className="w-full">
      <LoadingSvg className="h-28 w-28 mt-20 " />
    </div>
  );

  return (
    <section className="relative">
      <div className="  absolute  w-full z-20 hidden md:flex">
      {sessionClaims?.userId && ( <HomeHeader userId={sessionClaims.userId}/>)}

      
      </div>

      <section className="flex flex-shrink h-screen  pb-2">
        {sessionClaims?.userId && (
          <>
            <Suspense fallback={LoadingPosts}>
              <PostsContainer userId={sessionClaims.userId} />
            </Suspense>
            <Suspense fallback={LoadingTopAccounts}>
              <TopAccountsContainer userId={sessionClaims.userId} />
            </Suspense>
          </>
        )}
      </section>
    </section>
  );
}
