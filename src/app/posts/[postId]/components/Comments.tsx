import React from 'react'
import Comment from './Comment'

const Comments = () => {
  return (
    <>
    <h3 className='text-whiteShade text-lg font-semibold pt-2'>Comments</h3>

    
    <section className='mt-5 overflow-y-scroll h-48 flex flex-col px-2 customScrollBar_dark '>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
    

    </section>
    </>
  )
}

export default Comments