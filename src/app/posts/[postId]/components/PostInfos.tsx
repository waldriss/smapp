import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import Comments from './Comments'
import PostActions from './PostActions'
import { TPostDetails } from '@/lib/types/Post'

const PostInfos = ({post}:{post:TPostDetails}) => {
  return (
   <section className=' w-1/2 bg-bgShade1 pt-5 px-7 pb-1'>
    <div className="flex items-center space-x-2    ">
      <Avatar className='w-12 h-12'>
        <AvatarImage src="/avatars/01.png" />
        <AvatarFallback>{post.poster.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      
      <div>
        <p className="text-sm font-semibold text-whiteShade leading-none">{post.poster.name}</p>
        <p className="text-sm text-muted-foreground">@{post.poster.username}</p>
      </div>
    
    </div>
  <Separator className='bg-[#1d1f2a] mt-6 '/>
  <p className='text-base text-whiteShade pt-6 min-h-[100px]'> {post.caption}</p>
  
  <Comments/>
  <PostActions/>

   </section>
  )
}

export default PostInfos