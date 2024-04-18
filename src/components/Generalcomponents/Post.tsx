import React from 'react'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import { IPost } from '@/lib/types/Post'

const Post = ({post}:{post:IPost}) => {
  
  //border-[#111118]
  return (
    <section key={post?.id} className='  md:ml-0 relative flex flex-col justify-start items-start gap-y-3  bggradientPost w-full sm:w-[90%] md:w-[88%] lg:w-[85%] xl:w-[80%] max-w-[630px]  rounded-3xl border-solid border-1 border-borderPrimary shadow-sm '>
      <PostHeader poster={post.poster} posterId={post.posterId} />
      <PostContent post={post} /> 






    </section>
  )
}

export default Post