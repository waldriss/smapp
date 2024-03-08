import Image from 'next/image'
import React from 'react'
import img from "@public/images/glacier-aurora-aurora-borealis-night.jpg"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import AnimatedHeart from './AnimatedHeart'
import { BookmarkPlus, MessageCircle } from 'lucide-react'

const ExplorePost = ({subclass,isprofilePage}:{subclass?:string,isprofilePage?:boolean}) => {
  return (
    <section className={'relative bg-primary  rounded-3xl overflow-hidden h-auto w-auto aspect-square '+subclass}>
        <Image alt='OM' className='w-full h-full ' width={800} height={800} src={img.src}/>
        {!isprofilePage&&
        <div className={' absolute bottom-0 px-6 pt-4 h-[88px] flex justify-between  w-full bg-gradient-to-t from-backgroundgrad2 to-transparent rounded-b-[24px] '}>
                <div className="flex items-center space-x-2  ">
                    <Avatar className='w-9 h-9'>
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    
                    <div>
                    <p className="text-sm font-semibold text-white leading-none">Sofia Davis</p>
                    </div>    
                </div>
                <div className=' gap-x-2 relative flex justify-end items-center'>
                        <div className='flex justify-start items-center'>
                        <AnimatedHeart subclass='!w-[45px]'/>
                        <span className='-ml-[6px] text-sm text-white'> 123</span>

                        </div>
                        
                    
                        
                    
                        <BookmarkPlus className='w-6 h-6 text-white'/>
                </div>
            

        </div>
        }


    </section>
  )
}

export default ExplorePost