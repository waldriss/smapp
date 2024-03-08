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

const formSchema = z.object({
  email_reg: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password_reg: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
  username: z.string().min(8, {
    message: "username must be at least 8 characters.",
  }),
  name: z.string().min(6, {
    message: "name must be at least 6 characters.",
  }),
  password_reg_confirmation: z.string().min(6, {
    message: "password confirmation must be at least 6 characters.",
  }),
});

const SignupForm = () => {
  
  const { isLoaded, signUp, setActive } = useSignUp();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      /*const signedup=await signUp?.create({
      emailAddress:values.email_reg,
      password:values.password_reg,
      username:values.username,
      firstName:values.name,
    
    });*/

      const resp=await registerUserInDB(values.email_reg,values.username,values.name,values.password_reg);
      console.log(resp);

    
        
      
    } catch (error) {
      console.error("Error signing in:", error);
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
