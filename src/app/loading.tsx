import LoadingSvg from '@/components/Generalcomponents/LoadingSvg'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <LoadingSvg className='h-36 w-36'/>
    </div>
  )
}

export default Loading