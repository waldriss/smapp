"use client"
import React from 'react'
import Comment from './Comment'
import { TComment } from '@/lib/types/Post'
import { UseToken } from '@/lib/store/store'

const Comments = ({comments,userId}:{comments:TComment[],userId?: string | null}) => {
  const {token}=UseToken()
  return (
    <>
    <h3 className='text-whiteShade text-medium font-sans font-semibold pt-2'>Comments</h3>

    
    <section className='mt-2 overflow-y-scroll h-48 flex flex-col px-1 gap-y-3 customScrollBar_dark '>
        {comments.map((comment)=><Comment token={token} key={comment.id} userId={userId} comment={comment}/>)}
        
      
    

    </section>
    </>
  )
}

export default Comments