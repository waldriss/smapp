"use client";
import React from "react";
import { TooltipProvider } from "../ui/tooltip";
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { cookies } from "next/headers";
import SideNav from "./SideNav";

interface MailProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}
const Resizable = ({
  defaultLayout = [265, 440],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
}: MailProps) => {


  

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
       
          <SideNav
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={4}
          />
        

        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="max-h-screen min-h-screen overflow-y-scroll customScrollBar_dark bg-gradient-to-t from-backgroundgrad1 to-backgroundgrad2">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Resizable;
