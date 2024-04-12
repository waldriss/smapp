"use client"
import React from 'react'
import TopAccount from './TopAccount'
import { TopUser } from '@/lib/types/user'
import { useGetTopUsers } from '@/lib/react-query/queries'
import { Home } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

const TopAccounts = ({InitialtopUsers,userId,token}:{InitialtopUsers:TopUser[],userId:string,token:string|null}) => {
  const { getToken } = useAuth();
  const {data:users}=useGetTopUsers(userId,InitialtopUsers,getToken) as {data:TopUser[]}
  return (
    <section className='overflow-y-scroll customScrollBar_dark w-full pt-28 hidden lg:block'>

    <section className='grid grid_auto py-14 gap-y-5 gap-x-1 pl-[18px] pr-0 justify-items-center  '>
      {users.map((user)=><TopAccount user={user} />)}
      
     
      
     
    </section>

    </section>
  )
}

export default TopAccounts