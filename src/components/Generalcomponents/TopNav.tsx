import React from "react";
import NotificationMenu from "./NotificationMenu";
import { TNotification } from "@/lib/types/Notification";
import { AuthenticatedUser } from "@/lib/types/user";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { UseAuthenticatedUser, UseToken } from "@/lib/store/store";

export const TopNav = ({
  notifications,
}: {
  notifications: TNotification[];

}) => {
  const {token}=UseToken()
  const {authenticatedUser,setauthenticatedUser}=UseAuthenticatedUser();


  const { signOut } = useClerk();
  const logout=()=>{
   signOut();
   setauthenticatedUser(undefined);
 
  }
   
  return (
    <div className="md:hidden z-10 flex items-center justify-between pr-10 absolute w-full bg-bgShade1 border-b-1 border-borderPrimary h-20">
      <h1 className=" font-sans text-whiteShade text-3xl pl-2 font-bold">
        Logo{" "}
      </h1>
      <div className="flex items-center gap-x-8">
      {authenticatedUser&&<NotificationMenu
      token={token}
          InitialNotifications={notifications.length==0?undefined:notifications}
          userId={authenticatedUser.id.toString()}
        />}

        <Button onClick={logout} size={"sm"} className="  bg-secondary px-5 hover:bg-[#2e3142] ">
          <LogOut className="h-5 w-5" />
          <span className="font-sans ml-2">Log out</span>
        </Button>
      </div>
    </div>
  );
};
