import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  commentPost,
  createPost,
  deleteComment,
  deletePost,
  dislikePost,
  likePost,
  sharePost,
  unsharePost,
  updatePost,
} from "../api/PostRequests";
import { NewPost, UpdatedPost } from "../types/PostRequestsTypes";
import { QUERY_KEYS } from "./queryKeys";
import { UpdatedUser, UserToRegister } from "../types/user";
import {
  acceptFollow,
  deleteFollow,
  follow,
  updateUser,
} from "../api/UserRequests";
import { seeNotification } from "../api/NotificationsRequests";
import { registerUserInDB } from "../api/AuthRequests";
import { GetToken } from "../types/global";

//------------Post Mutations
export const useCreatePost = (userId: string,getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: NewPost) => createPost(newPost,getToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE_POSTS,userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_HOME_POSTS, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER, userId],
      });
    },
  });
};

export const useUpdatePost = (postId: number | undefined, userId: string,getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedPost: UpdatedPost) => updatePost(updatedPost, postId,getToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE_POSTS,userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_HOME_POSTS, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER, userId],
      });
    },
  });
};

export const useLikePost = (userId: string,getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: number; userId: number }) =>
      likePost(postId, userId,getToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE_POSTS,userId]
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_HOME_POSTS, userId],
      });
    },
  });
};

export const useDisLikePost = (userId: string,getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: number; userId: number }) =>
      dislikePost(postId, userId,getToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE_POSTS,userId]
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_HOME_POSTS, userId],
      });
    },
  });
};

export const useSharePost = (userId: string,getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: number; userId: number }) =>
      sharePost(postId, userId,getToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE_POSTS,userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_HOME_POSTS, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER, userId],
      });
    },
  });
};

export const useUnsharePost = (userId: string,getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: number; userId: number }) =>
      unsharePost(postId, userId,getToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE_POSTS,userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_HOME_POSTS, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER, userId],
      });
    },
  });
};

export const useCommentPost = (postId: number,getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      userId,
      body,
    }: {
      postId: number;
      userId: number;
      body: string;
    }) => commentPost(postId, userId, body,getToken),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST, postId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_HOME_POSTS, variables.userId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE_POSTS, variables.userId.toString()],
      });
    },
  });
};

export const useDeleteComment = (postId: number,getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId,userId }: { commentId: number,userId:string}) =>
      deleteComment(commentId,getToken),
    onSuccess: (data,variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST, postId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_HOME_POSTS, variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE_POSTS,variables.userId],
      });
    },
  });
};

export const useDeletePost = (getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId,userId }: { postId: number,userId:string }) => deletePost(postId,getToken),
    onSuccess: (data,variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST, variables.postId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_HOME_POSTS, variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE_POSTS,variables.userId],
      });



      
    },
  });
};

//-------Auth Mutations
export const useRegisterInDB = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userToRegister: UserToRegister) => registerUserInDB(userToRegister),
    onSuccess: ({data,variables}) => {
     /* queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER,id.toString()]
      });
      
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_AUTHENTICATED_USER,id.toString()]
      });*/
  
      
    },
  });
};

//------------User Mutations

export const useUpdateUser = (id: number,getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedUser: UpdatedUser) => updateUser(updatedUser, id,getToken),
    onSuccess: () => {
      
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER,id.toString()]
      });
      
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_AUTHENTICATED_USER,id.toString()]
      });
      
    },
  });
};

export const useFollow = (getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      followerId,
      followedId,
    }: {
      followerId: number;
      followedId: number;
    }) => follow(followerId, followedId,getToken),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER, variables.followedId.toString()],
      });
    },
  });
};

export const useAcceptFollow = (getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      followerId,
      followedId,
    }: {
      followerId: number;
      followedId: number;
    }) => acceptFollow(followerId, followedId,getToken),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER, variables.followerId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER, variables.followedId.toString()],
      });
    },
  });
};

export const useDeleteFollow = (getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      followerId,
      followedId,
    }: {
      followerId: number;
      followedId: number;
    }) => deleteFollow(followerId, followedId,getToken),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER, variables.followerId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER, variables.followedId.toString()],
      });
    },
  });
};

// Notification Mutations

export const useSeeNotification = (getToken: GetToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      notificationId,
      userId,
    }: {
      notificationId: number;
      userId: string;
    }) => seeNotification(notificationId,userId,getToken),
    onSuccess: (data, variables) => {
      
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTIFICATIONS, variables.userId],
      });
    },
  });
};