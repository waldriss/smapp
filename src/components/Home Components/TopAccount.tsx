import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

const TopAccount = () => {
  return (
    <section className='bg-bgShade1 w-48 pt-6 pb-6 rounded-3xl border border-1px border-[#1d1f2a]'>
    <div className="flex flex-col gap-y-5  items-center justify-center space-x-2">
        <Avatar className='w-14 h-14'>
        <AvatarImage src="/avatars/01.png" />
        <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        
        <div className='flex flex-col justify-center items-center'>
        <p className="text-sm font-semibold text-whiteShade leading-none">Sofia Davis</p>
        <p className="text-sm text-muted-foreground">m@example.com</p>
        </div>
        
        <Link href={"/"}
        className={cn(
            buttonVariants({ variant:'default', size: "lg" }),"bg-primary")}>
                Follow
        </Link>
       
    
    </div>
  

  

    </section>
  )
}

export default TopAccount