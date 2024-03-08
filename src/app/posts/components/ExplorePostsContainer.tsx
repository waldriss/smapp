import { Input } from '@/components/ui/input'
import React from 'react'

import { Search } from 'lucide-react'
import SelectExplorePosts from './SelectExplorePosts'
import ExplorePost from '@/components/Generalcomponents/ExplorePost'
const ExplorePostsContainer = () => {
  return (
    <section className='w-full'>
         <div className="bg-background/95 rounded-xl mt-14 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative flex justify-center items-center">
                  <Search className="absolute left-4  h-6 w-6 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-12 py-6 text-base rounded-xl bg-backgroundgrad2" />
                </div>
              </form>     
         </div>
         <div className=' mt-16 flex justify-between items-center'>
         <h2 className=" text-3xl font-bold text-whiteShade  "> Popular Today</h2>
         <SelectExplorePosts/>
         </div>
         <section className='grid gap-x-2 gap-y-2 py-10 justify-items-center max-w-full grid-cols-3 mx-auto'>
          <ExplorePost/>
          <ExplorePost/>
          <ExplorePost/>
          <ExplorePost/>
          <ExplorePost/>
          


         </section>



    </section>
  )
}

export default ExplorePostsContainer