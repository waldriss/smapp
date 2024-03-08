
import { ImagePlus } from 'lucide-react'
import React from 'react'
import PostForm from './components/PostForm'

const page = () => {
  
  return (
  <article className=' px-20 py-8 '>
  <h1 className=" mb-14  text-whiteShade text-4xl font-bold w-full flex items-center gap-x-3 ">
  <ImagePlus className='h-9 w-9 text-whiteShade'/> Create Post</h1>

  <PostForm/>

  



  </article>
  )
}

export default page