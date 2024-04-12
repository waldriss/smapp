import { getServerSideTopUsers } from "@/lib/api/serverSideRequests";
import { TopUser } from "@/lib/types/user";
import React, { Suspense } from "react";
import TopAccounts from "./TopAccounts";
import LoadingSvg from "../Generalcomponents/LoadingSvg";
import { auth } from "@clerk/nextjs";


const TopAccountsContainer = async ({ userId }: { userId: string }) => {
  const {getToken}=auth()
  const token=await getToken()

  const TopUsers: TopUser[] = await getServerSideTopUsers(userId,token);
 
  return (
   
      <TopAccounts token={token} InitialtopUsers={TopUsers} userId={userId} />
    
  );
};

export default TopAccountsContainer;
