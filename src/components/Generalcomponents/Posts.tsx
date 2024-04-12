"use client";
import React, { useEffect, useRef } from "react";
import Post from "./Post";
import { IPost } from "@/lib/types/Post";
import { useGetHomePosts } from "@/lib/react-query/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSvg from "./LoadingSvg";
import { Home } from "lucide-react";
import { UseAnimateHomeHeader } from "@/lib/store/store";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { useAuth } from "@clerk/nextjs";

const Posts = ({ posts, userId,token }: { posts: IPost[]; userId: string,token:string|null }) => {
  const { getToken } = useAuth();
  const { data, hasNextPage, fetchNextPage, isLoading,isPending } = useGetHomePosts(
    userId,
    posts,
    getToken
  );
  
  const scrollPosts: IPost[] = [].concat(...data.pages);
  console.log(posts);
  

  const scrollableParentRef = useRef<HTMLDivElement>(null);
  const { setisAnimateHomeHeader } = UseAnimateHomeHeader();
  const queryClient = useQueryClient();
  /*
  useEffect(() => {
    queryClient.setQueriesData(
      { queryKey: [QUERY_KEYS.GET_HOME_POSTS,userId] },
      (data: any) => {
        return {
          pages: posts,
          pageParams:[1],
        };
      }
    );
  }, [posts]);*/

  const handleScroll = () => {
    if(scrollableParentRef.current){
      if (scrollableParentRef.current.scrollTop > 100) {
        setisAnimateHomeHeader(true);
      } else {
        setisAnimateHomeHeader(false);
      }

    }
   
  };
  useEffect(() => {
    scrollableParentRef.current?.addEventListener("scroll", handleScroll);

    return () =>
      scrollableParentRef.current?.removeEventListener("scroll", handleScroll);
  }, [scrollableParentRef]);

  return (
    <section
      ref={scrollableParentRef}
      id="scrollablediv"
      className="relative max-h-screen md:h-screen w-full lg:min-w-[73%] lg:w-[73%] xl:min-w-[65%] xl:w-[65%] mt-20 md:mt-0 md:pt-28  overflow-y-scroll customScrollBar_dark "
    >
      {/*<h1  className=" pl-7 pt-8 text-4xl font-bold w-full text-whiteShade "> Home Feed</h1>*/}

      <InfiniteScroll
        className="flex gap-y-16 pt-14 pl-[18px] flex-col justify-start items-center w-full"
        dataLength={scrollPosts.length}
        next={() => {
          fetchNextPage();
        }}
        hasMore={hasNextPage}
        loader={<LoadingSvg className="w-32 h-32" />}
        scrollableTarget={"scrollablediv"}
      >
        {scrollPosts.map((scrollPost: IPost) => (
          <Post key={scrollPost.id} post={scrollPost} />
        ))}
      </InfiniteScroll>
    </section>
  );
};

export default Posts;