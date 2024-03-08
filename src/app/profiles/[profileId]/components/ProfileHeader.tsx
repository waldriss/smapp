import React from "react";
import img from "@public/images/glacier-aurora-aurora-borealis-night.jpg";
import Image from "next/image";
import { PlusSquare, SlidersHorizontal, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const ProfileHeader = ({userImage}:{userImage?:string}) => {
  return (
    <div className="w-full bg-gradient-to-t from-backgroundgrad1 to-backgroundgrad2 h-40 relative mb-8">
      <div className="absolute rounded-full circle  w-72 h-72 border-solid border-backgroundgrad2 border-[12px] bg-white bottom-0 translate-y-1/2 left-10">
        <Image
          alt="OM"
          className="w-full h-full circleForm"
          width={800}
          height={800}
          src={userImage?userImage:img.src}
        />

        {/*<div className='bg-[rgb(255,255,255,0.7)] w-full h-full circleForm absolute top-0'>
            <Input type='file' className='bg-white h-full w-full opacity-0' />

            </div>*/}
      </div>

      {/* <div className='absolute right-0 bottom-0 pr-12 pb-5 flex gap-x-8'>
                <PlusSquare className='text-white cursor-pointer w-10 h-10'/>

                <SlidersHorizontal className='text-white cursor-pointer w-10 h-10'/>


            </div>*/}

      <div className="absolute right-0 bottom-0 pr-12 pb-5 flex gap-x-8">
        <Button className="bg-primary rounded-full py-6 px-6">
          <UserRoundPlus className="mr-2 h-5 w-6" />
          <span className="text-base"> Follow</span>
        </Button>
        <Button className="bg-primary rounded-full py-6 px-6">
          <SlidersHorizontal className="mr-2 h-5 w-6" />
          <span className="text-base"> edit profile </span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
