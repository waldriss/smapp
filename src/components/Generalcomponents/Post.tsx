import React from 'react'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import { IPost } from '@/lib/types/Post'

const Post = ({post}:{post?:IPost}) => {
  return (
    <section key={post?.id} className=' relative flex flex-col justify-start items-start gap-y-3 pb-10 bg-bgShade1 w-[80%]  rounded-b-3xl rounded-t-[50px] border-solid border border-1px border-[#1d1f2a] '>
      <PostHeader poster={post?.poster} posterId={post?.posterId} />
      <PostContent post={post} /> 






    </section>
  )
}

export default Post