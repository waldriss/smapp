import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const Comment = () => {
  return (
    <section>
          

      <div className="flex items-center space-x-2    ">
        <Avatar className='w-9 h-9'>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        
        <div>
            <p className="text-sm font-semibold text-whiteShade leading-none">Sofia Davis</p>
            <p className="text-sm text-muted-foreground">m@example.com</p>
        </div>
    
        </div>
        <p className='text-whiteShade pt-2 pl-2 pr-1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum debitis dolore perferendis tempore fugiat doloremque ad quis numquam, blanditiis sed 
        </p>

        <Separator className='bg-[#1d1f2a] w-[70%] my-3 mx-auto '/>

        
    </section>
  )
}

export default Comment