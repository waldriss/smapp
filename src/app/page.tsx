import Image from "next/image";
import Posts from "@/components/Generalcomponents/Posts";
import TopAccounts from "@/components/Home Components/TopAccounts";
import { auth } from "@clerk/nextjs";
import { getServerSideHomePosts } from "@/lib/api/serverSideRequests";
import { IPost } from "@/lib/types/Post";



export default async function Home() {
  const { userId } = auth();
  let posts: IPost[]= [];

 
  if (userId) {
     posts=await getServerSideHomePosts(userId);
    
    
     
  }
 
 
  return (
    <section className="">
     
        <section className="flex flex-shrink h-screen  pb-2">
          
        {(userId&&posts)&&<Posts posts={posts} userId={userId} />}
        <TopAccounts/>


      </section>
    
     
    </section>
  );
}
