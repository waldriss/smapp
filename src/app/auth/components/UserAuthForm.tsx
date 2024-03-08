"use client";

import Link from "next/link";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import { useState } from "react";

export function UserAuthForm() {
  const [signIn, setsignIn] = useState(true);
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-whiteShade">
          {signIn ? "Sign in with your account" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {signIn
            ? "Enter your email and password to sign in"
            : "Enter your details to sign up"}
        </p>
      </div>
      {signIn?
        <SigninForm/>
        :
        <SignupForm />
      }
      {signIn ? (
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
            onClick={()=>setsignIn((prev)=>!prev)}
          >
            Sign Up
          </Link>{" "}
          .
        </p>
      ) : (
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
            onClick={()=>setsignIn((prev)=>!prev)}
          >
            Sign In
          </Link>{" "}
          .
        </p>
      )}
    </>
  );
}
