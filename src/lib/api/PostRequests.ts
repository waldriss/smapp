import { NewPost } from "../types/PostRequestsTypes";
import { backendUrl } from "../utils";

export const createPost = async (newPost: NewPost) => {
  try {
    const formData = new FormData();
    formData.append("file", newPost.file[0]);
    formData.append("caption", newPost.caption);
    formData.append("location", newPost.location);
    formData.append("tags", newPost.tags);
    formData.append("userId", newPost.userId.toString());

    const response = await fetch(`${backendUrl}createpost`, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message); // Error message from the backend
    }

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};





export const getHomePosts = async (userId: string,page:number) => {
  try {
    
    const postsResponse = await fetch(`${backendUrl}homePosts/${userId}?page=${page}`);
    const postsData = await postsResponse.json();
 
    return postsData.posts;
  } catch (error) {
    console.log(error);
  }
};
