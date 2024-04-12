import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { IPoster } from '@/lib/types/Post'

const PostHeader = ({poster,posterId}:{poster:IPoster|undefined,posterId:number|undefined}) => {
  return (
    <div className="flex items-center space-x-2 absolute px-7 py-3  mt-4 ml-4 rounded-full !border-borderPrimary glass2 ">
    <Avatar className='w-10 h-10'>
      <AvatarImage src={poster?.userImage} />
      <AvatarFallback>{poster?.name.substring(0, 2)}</AvatarFallback>
    </Avatar>
    
    <div>
      <p className="text-sm font-sans font-medium text-whiteShade leading-none">{poster?.name}</p>
      <p className="text-sm font-sans text-whiteShade ">@{poster?.username}</p>
    </div>
    
  </div>
  )
}

export default PostHeader