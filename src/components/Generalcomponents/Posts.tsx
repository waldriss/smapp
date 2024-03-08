"use client"
import React, { useRef } from 'react'
import Post from './Post'
import { IPost } from '@/lib/types/Post';
import { useGetHomePosts } from '@/lib/react-query/queries';
import InfiniteScroll from 'react-infinite-scroll-component';

const Posts = ({posts,userId}:{posts:IPost[],userId:string}) => {

  const {data,hasNextPage,fetchNextPage}=useGetHomePosts(userId,posts);
  
  const scrollPosts = [].concat(...data.pages);
  const scrollableParentRef = useRef(null);
  

  


  
  return (
    <section ref={scrollableParentRef} id='scrollablediv' className='h-screen min-w-[65%] w-[65%]  overflow-y-scroll customScrollBar_dark '>
     <h1 onClick={()=>fetchNextPage()} className=" pl-7 pt-8 text-4xl font-bold w-full text-whiteShade "> Home Feed</h1>
    


    <InfiniteScroll
    className='flex gap-y-16 pt-14 flex-col justify-start items-center w-full'
    dataLength={scrollPosts.length}
    next={()=>{ fetchNextPage();}}
    hasMore={hasNextPage}
    loader={<div> Loading....</div>}  
    scrollableTarget={"scrollablediv"}
   
    >
    {scrollPosts.map((scrollPost:IPost)=><Post key={scrollPost.id} post={scrollPost}/>)}

  </InfiniteScroll>
    
    
    
    </section>
  )
}

export default Posts