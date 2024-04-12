import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FollowedRequest } from "@/lib/types/user";
import { UsersRound } from "lucide-react";
import React from "react";
import FollowRequest from "./FollowRequest";
import { Separator } from "@/components/ui/separator";

const FollowRequestsList = ({
  followRequestsList,
  profileId,
}: {
  followRequestsList: FollowedRequest[];
  profileId: number;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
        <Button className="hidden lg:inline-flex bg-primary rounded-full py-6 px-6">
          <UsersRound className="mr-2 h-5 w-6" />
          <span className="text-base font-sans"> Follow requests </span>
        </Button>
        <UsersRound className="inline-block lg:hidden text-whiteShade cursor-pointer w-8 h-8 md:w-9 md:h-9" />
        </div>
        
      </DialogTrigger>
      <DialogContent className="!rounded-lg max-h-[60vh] h-[60vh]   min-w-[80%] sm:h-auto sm:max-h-[600px] lg:min-w-[750px] overflow-y-scroll border-none text-white  customScrollBar_dark bg-gradient-to-t from-backgroundgrad1 to-backgroundgrad2 ">
        <DialogHeader>
          <DialogTitle className="text-whiteShade mb-3 font-sans ">
            Follow requests List
          </DialogTitle>
          <Separator className="bg-[#1d1f2a] mb-2"/>
        </DialogHeader>
        <section className="flex flex-col gap-y-3 mb-3">
          {followRequestsList.map((followRequest) => (
            <FollowRequest
              key={followRequest.follower.id}
              followerOrFollowed={followRequest.follower}
              profileId={profileId}
              type="pending"
              isProfileOfAuth
            />
          ))}
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default FollowRequestsList;
