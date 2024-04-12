import React from "react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Generalcomponents/icons";
import { clerkClient } from "@clerk/nextjs";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSignUp } from "@clerk/nextjs";
import { registerUserInDB } from "@/lib/api/AuthRequests";
import { toast } from "sonner";
import { generateUniqueId } from "@/lib/utils";
import { useRegisterInDB } from "@/lib/react-query/mutations";

const formSchema = z
  .object({
    email_reg: z.string().min(2, {
      message: "email must be at least 2 characters.",
    }),
    password_reg: z.string().min(8, {
      message: "password must be at least 8 characters.",
    }),
    username: z.string().min(8, {
      message: "username must be at least 8 characters.",
    }),
    name: z.string().min(6, {
      message: "name must be at least 6 characters.",
    }),
    password_reg_confirmation: z.string().min(8, {
      message: "password confirmation must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password_reg === data.password_reg_confirmation, {
    message: "Passwords don't match",
    path: ["password_reg_confirmation"],
  });

const SignupForm = ({isLoading,setIsLoading}:{isLoading:boolean,setIsLoading:any}) => {
  const {mutateAsync:registerInDB}=useRegisterInDB()
  
  const toastContent = (message: string,id:string) => (
    <div className="w-full">
      <h4 className="font-sans font-semibold text-whiteShade text-base ">
        Authentification
      </h4>
      <div className="font-sans-serif2 flex items-center justify-between w-full">
        <p className="text-muted-foreground text-[0.95rem]">{message}</p>
        <Button className="font-sans" onClick={()=>toast.dismiss(id)} size={"sm"}>Undo</Button>
      </div>
    </div>
  );

  const { isLoaded, signUp, setActive } = useSignUp();


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      /*const signedup=await signUp?.create({
      emailAddress:values.email_reg,
      password:values.password_reg,
      username:values.username,
      firstName:values.name,
    
    });*/
    setIsLoading(true);

      const resp = await registerInDB({
        email:values.email_reg,
        username:values.username,
        name:values.name,
        password:values.password_reg}
      );
    } catch (error: any) {
      setIsLoading(false);
      
      const id=generateUniqueId();
      
      toast(toastContent(error.message,id),{position:"bottom-center",id:id});
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email_reg: "",
      password_reg: "",
      username: "",
      name: "",
      password_reg_confirmation: "",
    },
  });
  return (
    <Form {...form}>
      <form className={`font-sans-serif2 ${isLoading?'hidden':'block'} `} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email_reg"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-transparent text-whiteShade"
                      placeholder="Email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormControl>
                    <Input
                      className="bg-transparent text-whiteShade"
                      placeholder="Username"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormControl>
                    <Input
                      className="bg-transparent text-whiteShade"
                      placeholder="Name"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_reg"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormControl>
                    <Input
                      className="bg-transparent text-whiteShade "
                      id="password"
                      placeholder="Password"
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_reg_confirmation"
              render={({ field }) => (
                <FormItem className="mt-3 mb-6">
                  <FormControl>
                    <Input
                      className="bg-transparent text-whiteShade "
                      placeholder="Password confirmation"
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="font-sans" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
