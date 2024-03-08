import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { getHomePosts } from "../api/PostRequests";
import { IPost } from "../types/Post";




export const useGetHomePosts=(userId:string,initialPosts:IPost[])=>{
    
    return useInfiniteQuery({
  queryKey:[QUERY_KEYS.GET_HOME_POSTS],
  queryFn: ({ pageParam = 1 }) =>getHomePosts(userId,pageParam),
  getNextPageParam: (lastpage, pages) => lastpage.length===0?undefined:pages.length+1,
  initialPageParam:1,
  initialData:{
    pages:initialPosts,
    pageParams:[1]
  },
  enabled:false
  
})

}