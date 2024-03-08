import Image from 'next/image'
import React from 'react'
//import img from "@public/images/glacier-aurora-aurora-borealis-night.jpg"
import AnimatedHeart from './AnimatedHeart'
import {BookmarkPlus, MessageCircle} from "lucide-react"
import { IPost } from '@/lib/types/Post'
const PostContent = ({post}:{post:IPost|undefined}) => {
  return (
    <div className='text-white  w-full '>  
    <div className='  rounded-3xl overflow-hidden w-full'>
    <Image alt='OM' className='w-full max-h-[450px] ' width={800} height={800} src={post?post.postImage:""}/>


    </div>
    <div className=' gap-x-1 pt-3 relative flex justify-start items-center w-full px-4'>
        <div className='flex justify-start items-center'>
        <AnimatedHeart subclass='!w-[52px]'/>
        </div>
        <div className='flex justify-start items-center'>
        <MessageCircle className='w-7 h-7'/>

        <span className='ml-1 text-sm'> 123</span>

        </div>
      
        
    
        <BookmarkPlus className='w-7 h-7 absolute right-5'/>
    </div>
    <div className='pt-1 px-5 text-base font-extralight '>
      Liked by <span className='font-semibold'>odsldo </span>  and <span className='font-semibold'>1,2424 more </span> 
    </div>
    <div className='pt-4 px-5 text-base font-extralight'>
      {post?.caption}

    </div>
    
    </div>

  )
}

export default PostContent