
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  console.log("call");
  return (
    <AuthenticateWithRedirectCallback  redirectUrl={"/googleAuthLoader"}/>
  )
}

export default page