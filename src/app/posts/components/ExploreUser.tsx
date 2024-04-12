import { TExploreUser } from '@/lib/types/user'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
const ExploreUser = ({exploreUser}:{exploreUser:TExploreUser}) => {
  return (
    <>
      <div className="flex font-sans-serif2 justify-between items-center px-2">
        <Link
          href={"/profiles/" + exploreUser.id}
          className="flex items-center space-x-3   "
        >
          <Avatar className="w-12 h-12">
            <AvatarImage src={exploreUser.userImage} />
            <AvatarFallback className="text-black">
              {exploreUser.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-semibold text-whiteShade leading-none">
              {exploreUser.name}
            </p>
            <p className="text-sm text-muted-foreground">
              @{exploreUser.username}
            </p>
          </div>
        </Link>
        <div className="flex gap-x-4">
          
        </div>
      </div>
      <Separator className="bg-[#1d1f2a] " />
    </>
  )
}

export default ExploreUser