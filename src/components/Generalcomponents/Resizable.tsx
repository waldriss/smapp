"use client";
import React, { useRef } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { cookies } from "next/headers";
import SideNav from "./SideNav";
import { TNotification } from "@/lib/types/Notification";
import { User } from "@clerk/nextjs/server";
import { AuthenticatedUser } from "@/lib/types/user";
import BottomNav from "./BottomNav";
import { TopNav } from "./TopNav";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";

interface ResizableProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed: boolean;
  navCollapsedSize: number;
  notifications: TNotification[];
  token: string | null;
  authenticatedUser?: AuthenticatedUser;

  children: React.ReactNode;
}
const Resizable = ({
  defaultLayout = [265, 440],
  defaultCollapsed = false,
  navCollapsedSize,
  notifications,
  token,
  authenticatedUser,

  children,
}: ResizableProps) => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-screen  items-stretch"
      >
        {pathname != "/auth" &&
          pathname != "/googleAuthLoader" &&
          pathname != "/ssocallback" && (
            <SideNav
              defaultLayout={defaultLayout}
              defaultCollapsed={defaultCollapsed}
              navCollapsedSize={4}
              notifications={notifications}
              initialAuthenticatedUser={authenticatedUser}
              token={token}
            />
          )}

        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div
            id="scrollableResizable"
            className="max-h-screen min-h-screen overflow-y-scroll customScrollBar_dark bg-gradient-to-t from-backgroundgrad1 to-backgroundgrad2"
          >
            <TopNav notifications={notifications} />

            {children}

            <BottomNav />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Resizable;
