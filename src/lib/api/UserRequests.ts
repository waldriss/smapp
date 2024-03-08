import { UpdatedUser } from "../types/user";
import { backendUrl } from "../utils";





export const createPost = async (updatedUser: UpdatedUser) => {
  try {
    const formData = new FormData();
    if(updatedUser.file)  formData.append("file", updatedUser.file);
    if(updatedUser.bio)  formData.append("bio", updatedUser.bio);
    if(updatedUser.name)  formData.append("name", updatedUser.name);
    if(updatedUser.username)  formData.append("name", updatedUser.username);

    

    const response = await fetch(`${backendUrl}updateUser`, {
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
