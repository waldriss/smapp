import AnimatedHeart from '@/components/Generalcomponents/AnimatedHeart'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { BookmarkPlus } from 'lucide-react'
import React from 'react'

const PostActions = () => {
  return (
    <section className=''>
    <Separator className='bg-[#1d1f2a] mt-2 '/>
    <div className="flex items-center space-x-2 pt-4   ">
      <Avatar className='w-10 h-10'>
        <AvatarImage src="/avatars/01.png" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      
      <form className='flex-grow'>
       <Input className='bg-transparent rounded-full '/>
      </form>
    
    </div>
   
    <div className=' gap-x-2 relative flex justify-start items-center pt-3'>
                        <div className='flex justify-start items-center'>
                        <AnimatedHeart subclass='!w-[56px]'/>

                        </div>
                        
                    
                        
                    
                        <BookmarkPlus className='w-7 h-7 text-whiteShade'/>
                        <Button className='absolute right-0 rounded-full px-7 py-5'> Publish</Button>
     </div>
  

    </section>
  )
}

export default PostActions