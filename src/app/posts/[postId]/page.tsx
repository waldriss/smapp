import { Button } from '@/components/ui/button'
import { CornerUpLeft } from 'lucide-react'
import React from 'react'
import PostInfos from './components/PostInfos'
import Image from 'next/image'
import img from "@public/images/glacier-aurora-aurora-borealis-night.jpg"
import RelatedPosts from './components/RelatedPosts'
import { getServerSidePostDetails } from '@/lib/api/serverSideRequests'
import { TPostDetails } from '@/lib/types/Post'

const PostInfosPage = async({params:{postId}}:{params:{postId:string}}) => {
  const post:TPostDetails=await getServerSidePostDetails(postId);
  console.log(post);

  
  return (
    <article className='px-12 pt-10 pb-6 '>
        <div className='flex items-center'>
        <Button className='text-whiteShade' variant={'link'}>
            <CornerUpLeft className="mr-2 h-8 w-8" /> <span className='text-2xl'>Back</span>
        </Button>
        </div>

        <section className='w-full h-[600px] bg-[#0d0d12] mt-10 rounded-3xl flex items-stretch overflow-hidden border-solid border border-1px border-[#1d1f2a]'>
            <div className='w-1/2 flex flex-col justify-center items-center p-5 '>
            <Image alt='OM' className='h-full w-full rounded-3xl' width={800} height={800} src={post.postImage}/>
   

            </div>

            <PostInfos post={post}/>


        </section>

        <RelatedPosts/>


    </article>
  )
}

export default PostInfosPage