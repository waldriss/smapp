"use client";
import React from "react";
import { TooltipProvider } from "../ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Nav } from "./Nav";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import {
  Image,
  Bookmark,
  Home,
  Send,
  ImagePlus,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface MailProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed: boolean;
  navCollapsedSize: number;
}
const SideNav = ({
  defaultLayout = [265, 440],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const pathname = usePathname();
  const {user } = useUser();

  return (
    <>
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          setIsCollapsed(true);
        }}
        onExpand={() => {
          setIsCollapsed(false);
        }}
        className={cn(
          isCollapsed &&
            "min-w-[80px] transition-all duration-300 ease-in-out ",
          "bg-bgShade1 ", (pathname=="/auth")&&"hidden"
        )}
      >
        <div
          className={cn(
            " pt-5 pb-4 gap-y-8 flex flex-col  items-start justify-start ",
            isCollapsed ? "items-center" : "px-2"
          )}
        >
          <h2 className="text-3xl font-bold text-whiteShade"> logo </h2>
          <div className="flex items-center justify-between space-x-4">
            <Link href={`/profiles/${user?.externalId}`} className="flex items-center space-x-2">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>{user?.firstName?.substring(0, 2)}</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div>
                  <p className="text-base font-semibold leading-none text-whiteShade">
                    {user?.firstName}
                  </p>
                  <p className="text-sm text-muted-foreground ">
                    @{user?.username}
                  </p>
                </div>
              )}
            </Link>
          </div>
        </div>
        <Separator className="bg-[#1d1f2a]" />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Home",
              label: "",
              icon: Home,
              variant: "default",
              active: true,
            },
            {
              title: "explore",
              label: "",
              icon: Image,
              variant: "default",
              active: false,
            },
            {
              title: "Bookmark",
              label: "",
              icon: Bookmark,
              variant: "default",
              active: false,
            },
            {
              title: "Create Post",
              label: "",
              icon: ImagePlus,
              variant: "default",
              active: false,
            },
            
            {
              title: "Messages",
              label: "",
              icon: Send,
              variant: "default",
              active: false,
            },
          ]}
        />
        <Separator className="bg-[#1d1f2a]" />
      </ResizablePanel>
      <ResizableHandle className={`bg-bgShade1 ${(pathname=="/auth")&&"hidden"}`} withHandle />
    </>
  );
};

export default SideNav;
