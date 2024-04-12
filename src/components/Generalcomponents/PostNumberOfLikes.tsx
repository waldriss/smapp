import React from 'react'

const PostNumberOfLikes = ({likesNumber}:{likesNumber:number}) => {
    
  return (
    <div>
    Liked by <span className="font-semibold">{likesNumber} </span> and{" "}
    <span className="font-semibold">{likesNumber>2?likesNumber-1+" more":""} </span>
  </div>
  )
}

export default PostNumberOfLikes