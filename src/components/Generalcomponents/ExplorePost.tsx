import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AnimatedHeart from "./AnimatedHeart";
import { BookmarkPlus, MessageCircle } from "lucide-react";
import { TUserPost } from "@/lib/types/user";
import Link from "next/link";
import { TExplorePost } from "@/lib/types/Post";
import Share from "./Share";

const ExplorePost = ({
  subclass,
  isprofilePage,
  post,
}: {
  subclass?: string;
  isprofilePage?: boolean;
  post: TUserPost | TExplorePost;
}) => {
  const explorePost = post as TExplorePost;
  
 
  

  return (
    <Link
      key={post.id}
      href={"/posts/" + post.id}
      className={
       `  block cursor-pointer relative bg-transparent ${isprofilePage?"overflow-hidden":"border-1 border-borderPrimary "} rounded-3xl  h-auto w-auto aspect-square ` +
        subclass
      }
    >
      <Image
        alt="OM"
        className={`w-full h-full object-cover ${!isprofilePage&& "rounded-3xl"}`}
        width={800}
        height={800}
        src={post.postImage}
      />
      {!isprofilePage && (
        <div
          className={
            " absolute font-sans rounded-b-3xl -bottom-[0px] px-6 pt-4 h-[88px] flex justify-between  w-full bg-gradient-to-t from-backgroundgrad2 to-transparent  "
          }
        >
          <div className="flex items-center space-x-2  ">
            <Avatar className="w-9 h-9">
              <AvatarImage src={explorePost.poster.userImage} />
              <AvatarFallback>{explorePost.poster.name.substring(0, 2)}</AvatarFallback>
            </Avatar>

            <div>
            
            </div>
          </div>
          <div className=" gap-x-2 relative flex justify-end items-center">
            <div className="flex justify-start items-center">
              <AnimatedHeart  subclass="!w-[45px]" postId={explorePost.id} likers={explorePost.liked_posts}  />
              <span className="-ml-[6px] text-sm font-medium text-white"> {explorePost.liked_posts.length}</span>
            </div>

           
            <Share className="w-6 h-6 text-white" postId={explorePost.id} sharers={explorePost.shared_posts}/>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ExplorePost;
