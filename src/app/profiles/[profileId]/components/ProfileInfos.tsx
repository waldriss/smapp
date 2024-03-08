import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const ProfileInfos = ({name,userName}:{name:string,userName:string}) => {
  return (
    <section>
      <p className="text-3xl font-semibold  leading-none pb-1 text-whiteShade">
        {name}
      </p>
      <p className="text-base text-muted-foreground ">@{userName}</p>

      <p className="pt-4 text-whiteShade">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero fugiat
        minus deleniti atque, sed iusto laborum corrupti possimus ipsum labore
        voluptates libero earum iste i
      </p>

      {/*<Input  className="text-3xl font-semibold  leading-none mb-1" value={"Sofia Davis"}/>
        <Input  className="text-base " value={"m@example.com"}/>
        <Textarea className='mt-4' value={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero fugiat minus deleniti atque, sed iusto laborum corrupti possimus ipsum labore voluptates libero earum iste i"}/>
        */}
    </section>
  );
};

export default ProfileInfos;
