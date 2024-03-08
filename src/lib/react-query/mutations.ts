import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/PostRequests";
import { NewPost } from "../types/PostRequestsTypes";
import { QUERY_KEYS } from "./queryKeys";





export const useCreatePost = () => {
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn: (newPost: NewPost) => createPost(newPost),
    onSuccess:()=>{
      /*
      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
      }) */
    }
  });
};
