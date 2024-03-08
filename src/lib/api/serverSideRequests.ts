import { backendUrl } from "../utils";

export const getServerSideHomePosts = async (userId: string) => {
  try {
    const postsResponse = await fetch(`${backendUrl}homePosts/${userId}`, {
      cache: "default",
    });
    const postsData = await postsResponse.json();

    return postsData.posts;
  } catch (error) {
    console.log(error);
  }
};

export const getServerSidePostDetails = async (postId: string) => {
  try {
    const postResponse = await fetch(`${backendUrl}getPost/${postId}`, {
      cache: "default",
    });
    const postData = await postResponse.json();

    return postData.post[0];
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const userResponse = await fetch(`${backendUrl}user/${userId}`, {
      cache: "default",
    });
    const userData = await userResponse.json();
    if (userResponse.ok) {
      

      return userData.user;
    } else {
      throw new Error(userData.message);
    }
  } catch (error) {
    console.log(error);
  }
};
