import Image from "next/image";
import React, { useState } from "react";
import AnimatedHeart from "./AnimatedHeart";
import { BookmarkPlus, MessageCircle } from "lucide-react";
import { IPost } from "@/lib/types/Post";
import bg_grid from "@public/svgs/grid.svg";
import Share from "./Share";
import { Separator } from "../ui/separator";
import { calculateTimeElapsed } from "@/lib/utils";
import Link from "next/link";
import PostNumberOfLikes from "./PostNumberOfLikes";
const PostContent = ({ post }: { post: IPost }) => {
  const [likesNumber,setlikesNumber]=useState(post.liked_posts.length);
  return (
    <div className="text-white font-sans-serif2  w-full ">
      <Link href={`/posts/${post.id}`} className=" block rounded-t-3xl rounded-b-xl border-solid border-1 border-[#111118] overflow-hidden w-full">
        <Image
          alt="OM"
          className="w-full aspect-square "
          width={800}
          height={800}
          src={post ? post.postImage : ""}
        />
      </Link>
      <div>
        <div className=" gap-x-2 py-1 relative flex justify-start items-center w-full px-4">
          <div className="flex justify-start items-center">
            <AnimatedHeart
              postId={post.id}
              likers={post.liked_posts}
              setlikesNumber={setlikesNumber}
              subclass="!w-[52px] mb-[2px]"
            />
          </div>
          <div className="flex justify-start items-center">
            <MessageCircle className="w-[32px] h-[32px] stroke-2 stroke-whiteShade" />

            <span className="ml-1 text-base font-normal"> {post._count.commented_posts}</span>
          </div>

          <Share
            postId={post.id}
            sharers={post.shared_posts}
            className="w-[32px] h-[32px] absolute right-5 stroke-2"
          />
        </div>
        <Separator className="bg-[#171821] h-[1px] mb-3" />
        <div className="pt-1 px-5 flex justify-between text-base font-light ">
         <PostNumberOfLikes likesNumber={likesNumber}  />
          <span className="text-muted-foreground">{post.location}</span>
        </div>
        <p className="pt-4 px-5 text-base ">
          {post?.caption}
        </p>
        <p className="text-[#a5a9c0] px-5 text-base font-extralight">
          {post?.tags.map(str => `#${str}`).join(' ')}
        </p>
      </div>
      <Separator className="bg-[#171821] h-[1px] mt-6 " />
      <div className="flex items-center justify-center my-3">
      <span className="text-muted-foreground text-sm font-extralight"> {calculateTimeElapsed(post.createdAt)}</span>
      </div>
    </div>
  );
};

export default PostContent;