"use client";
import React, { useEffect } from "react";
import { TooltipProvider } from "../ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Nav } from "./Nav";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { Image, Bookmark, Home, Send, ImagePlus, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import NotificationMenu from "./NotificationMenu";
import { TNotification } from "@/lib/types/Notification";
import { AuthenticatedUser } from "@/lib/types/user";
import { useGetAuthenticatedUser } from "@/lib/react-query/queries";
import { Button } from "../ui/button";
import { useMediaQuery } from "@/lib/hooks/mediaqueryhook";
import { UseAuthenticatedUser, UseToken } from "@/lib/store/store";

interface SideNavProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed: boolean;
  navCollapsedSize: number;
  notifications: TNotification[];
  initialAuthenticatedUser?: AuthenticatedUser;
  token: string | null;
}
const SideNav = ({
  defaultLayout = [265, 440],
  defaultCollapsed = false,
  navCollapsedSize,
  notifications,
  initialAuthenticatedUser,
  token,
}: SideNavProps) => {
  /* console.log(defaultLayout[0]);
  console.log(defaultCollapsed);
  console.log(navCollapsedSize);*/
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();

  const { user } = useUser();
  const { getToken } = useAuth();

  const { data: authenticatedUser } = useGetAuthenticatedUser(
    initialAuthenticatedUser,
    getToken,
    user?.externalId
  ) as { data: AuthenticatedUser };

  const { setauthenticatedUser } = UseAuthenticatedUser();
  const { setToken,token:gobalToken } = UseToken();
  useEffect(() => {
    setauthenticatedUser(authenticatedUser);
  }, [authenticatedUser]);
 

  const isxl = useMediaQuery("(min-width: 1280px)");
  const islg = useMediaQuery("(min-width: 1024px)");
  const ismd = useMediaQuery("(min-width: 768px)");
  const resizableSize = (size: string) => {
    if (isxl) {
      return size === "minSize" ? 15 : 20;
    }
    if (islg) {
      return size === "minSize" ? 19 : 22;
    }
    if (ismd) {
      return size === "minSize" ? 25 : 28;
    }
  };
  const { signOut } = useClerk();
  const logout = () => {
    signOut();
    setauthenticatedUser(undefined);
  };

  return (
    <>
      <ResizablePanel
        defaultSize={20}
        collapsedSize={4}
        collapsible={true}
        minSize={resizableSize("minSize")}
        maxSize={resizableSize("maxSize")}
        onCollapse={() => {
          setIsCollapsed(true);
        }}
        onExpand={() => {
          setIsCollapsed(false);
        }}
        className={cn(
          isCollapsed &&
            "min-w-[80px] xl transition-all duration-300 ease-in-out ",
          "bg-bgShade1  flex-col hidden md:flex ",
          (pathname == "/auth" ||
            pathname == "/googleAuthLoader" ||
            pathname == "/ssocallback") &&
            "hidden"
        )}
      >
        {authenticatedUser && (
          <>
            <div
              className={cn(
                " pt-5 pb-4 gap-y-8 flex flex-col  items-start justify-start ",
                isCollapsed ? "items-center" : "px-2"
              )}
            >
              <h2 className="text-3xl font-bold text-whiteShade"> logo </h2>
              <div
                className={` flex flex-col gap-y-4 flex-wrap items-center justify-center w-full `}
              >
                <div
                  className={`${
                    isCollapsed ? "justify-center" : "justify-between space-x-4"
                  } flex items-center   w-full`}
                >
                  <Link
                    href={`/profiles/${authenticatedUser.id}`}
                    className="flex items-center space-x-2"
                  >
                    <Avatar className=" border-borderPrimary border-3 w-12 h-12">
                      <AvatarImage src={authenticatedUser.userImage} />
                      <AvatarFallback>
                        {authenticatedUser.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <div className="min-w-14">
                        <p className="text-sm font-sans tracking-tight font-medium  leading-none text-whiteShade">
                          {authenticatedUser.name}
                        </p>
                        <p className="text-sm font-sans tracking-tight text-muted-foreground ">
                          @{authenticatedUser.username}
                        </p>
                      </div>
                    )}
                  </Link>
                </div>

                {user?.externalId&&
                  <NotificationMenu
                    token={gobalToken}
                    InitialNotifications={notifications.length==0?undefined:notifications}
                    userId={user?.externalId}
                  />
                }
              </div>
            </div>
            <Separator className="bg-borderPrimary" />
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Home",
                  label: "",
                  icon: Home,
                  variant: "default",
                  active: pathname == "/",
                  url: "/",
                },
                {
                  title: "explore",
                  label: "",
                  icon: Image,
                  variant: "default",
                  active: pathname == "/posts",
                  url: "/posts",
                },

                {
                  title: "Create Post",
                  label: "",
                  icon: ImagePlus,
                  variant: "default",
                  active: pathname == "/postDetails",
                  url: "/postDetails",
                },

                {
                  title: "Messages",
                  label: "",
                  icon: Send,
                  variant: "default",
                  active: false,
                  url: "/",
                },
              ]}
            />
            <Separator className="bg-borderPrimary" />
            <div className="px-2 font-sans w-full justify-end items-center mb-5 flex-1 relative flex flex-col ">
              {isCollapsed ? (
                <Button
                  onClick={logout}
                  size={"icon"}
                  className="h-12 w-12 bg-[#191a24]  rounded-[5px]"
                >
                  <LogOut className=" md:stroke-1 lg:stroke-2 h-6 w-6" />
                </Button>
              ) : (
                <Button
                  onClick={logout}
                  size={"lg"}
                  className="w-full  flex   justify-start pl-5 text-base py-7 rounded-[5px] bg-[#191a24] text-whiteShade hover:bg-[rgb(255,255,255,0.02)]"
                >
                  <LogOut className="mr-3  md:stroke-1 lg:stroke-2 h-6 w-6" />
                  <span className="md:text-sm lg:text-base">Log out</span>
                </Button>
              )}
            </div>
          </>
        )}
      </ResizablePanel>
      <ResizableHandle
        className={`bg-borderPrimary hidden md:flex ${
          pathname == "/auth" && "hidden"
        }`}
        withHandle
      />
    </>
  );
};

export default SideNav;