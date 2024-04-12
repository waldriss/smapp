import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { TNotification } from "@/lib/types/Notification";
import { useRouter } from "next/navigation";
import { useSeeNotification } from "@/lib/react-query/mutations";
import { Button } from "../ui/button";
import { calculateTimeElapsed, notificationAvatarFallBack, notificationAvatarsrc, NotificationBody, NotificationLink } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";




const Notification = ({
  userId,
  notification,
  hasNextPage,
  fetchNextPage,
  token
}: {
  userId:string;
  notification: TNotification;
  hasNextPage: boolean;
  fetchNextPage: any;
  token:string|null;
}) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const { mutate: seeNotification } = useSeeNotification(getToken); 
  

 

  const handleLink = () => {
    if (notification.state === "unseen") {
      seeNotification({
        notificationId: notification.id,
        userId:userId
      });
    }
   
    router.push(NotificationLink(notification));
  };
  return (
    <>
      <div
        onClick={handleLink}
        className="flex items-start space-x-2 relative w-full hover:bg-[rgb(0,0,0,0.15)] py-[10px] px-4 cursor-pointer "
      >
        <Avatar className="w-12 h-12">
          <AvatarImage src={notificationAvatarsrc(notification)} />
          <AvatarFallback>{notificationAvatarFallBack(notification)}</AvatarFallback>
        </Avatar>

        <div className="w-full pr-2">
          <p className="text-sm  text-whiteShade leading-none">
            {NotificationBody(notification)}
          </p>
          <div className="flex justify-between pt-1">
            <p className="text-sm text-muted-foreground">
              {calculateTimeElapsed(notification.createdAt)}
            </p>
            <p className="text-sm text-muted-foreground">
              {notification.state === "unseen" && "unseen"}
            </p>
          </div>
        </div>
      </div>
      <Separator className="bg-[#1d1f2a] w-full h-[0.5px]" />
    </>
  );
};

export default Notification;
