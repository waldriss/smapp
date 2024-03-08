import React from 'react'
import TopAccount from './TopAccount'

const TopAccounts = () => {
  return (
    <article className='overflow-y-scroll customScrollBar_dark'>
    <h1 className=" pl-4 pt-8 text-4xl font-bold w-full text-whiteShade "> Top Accounts</h1>
    <section className='flex flex-wrap py-14 gap-y-5 gap-x-6 justify-center '>
      <TopAccount/>
      <TopAccount/>
      <TopAccount/>
      <TopAccount/>
      <TopAccount/>
      
     
    </section>

    </article>
  )
}

export default TopAccounts