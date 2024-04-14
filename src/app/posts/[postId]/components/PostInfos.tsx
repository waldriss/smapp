import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

import { TPostDetails } from "@/lib/types/Post";
import PostCommentsAndActions from "./PostCommentsAndActions";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { calculateTimeElapsed } from "@/lib/utils";

const PostInfos = ({
  post,
  deletePost,
}: {
  post: TPostDetails;
  deletePost: UseMutateAsyncFunction<
    any,
    Error,
    {
      postId: number;
      userId: string;
    },
    unknown
  >;
}) => {
 
  return (
    <section className=" relative w-full xl:w-1/2  bggradientPostInfos pt-5  px-3 sm:px-7 pb-3 xl:pb-1">
      <div className="flex items-center space-x-2 font-sans-serif2    ">
        <Avatar className="w-12 h-12">
          <AvatarImage src={post.poster.userImage} />
          <AvatarFallback>{post.poster.name.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-sm font-semibold text-whiteShade leading-none">
            {post.poster.name}
          </p>
          <p className="text-sm text-muted-foreground">
            @{post.poster.username}
          </p>
        </div>
      </div>
      <Separator className="bg-[#171821] mt-6 " />
      <p className="text-center flex flex-col  sm:flex-row justify-between font-sans-serif2 text-sm sm:text-base pt-1 w-full text-muted-foreground font-extralight">
        {calculateTimeElapsed(post.createdAt)}
        <span className="text-muted-foreground ">{post.location}</span>
      </p>

      <div className="pt-6 font-sans-serif2  flex justify-between text-base text-whiteShade font-normal ">
        <div>
          Liked by <span className="font-semibold">{post.liked_posts.length} </span> users.
          
        </div>
      </div>
      <p className="font-normal text-base text-whiteShade pt-4 min-h-[100px]">
        {" "}
        {post.caption}
      </p>

      <PostCommentsAndActions  deletePost={deletePost} post={post} />
    </section>
  );
};

export default PostInfos;
