import { backendUrl } from "../utils";

export const registerUserInDB = async (
  email: string,
  username: string,
  name: string,
  password:string
) => {
  try {
    const res = await fetch(`${backendUrl}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, name,password }),
    });

    if (!res.ok) {
      throw new Error("Error registering user in db:");
    }
    else{
        return res.json();
    }
  } catch (error) {
    console.error("Error registering user in db:", error);
  }
};

export const SignInUserInDB = async (
  email: string,
  username: string,
  name: string
) => {
  try {
    const res = await fetch(`${backendUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, name }),
    });

    if (!res.ok) {
      throw new Error("Error signing in user in db:");
    }
  } catch (error) {
    console.error("Error signing in user in db:", error);
  }
};
