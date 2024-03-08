"use client";
import * as React from "react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Generalcomponents/icons";

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
import { useClerk, useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
});
const SigninForm = () => {
  const router = useRouter();

  const { signOut } = useClerk();

  const { isLoaded, signIn, setActive } = useSignIn();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const signedin = await signIn?.create({
        identifier: values.email,
        password: values.password,
      });
      if (signedin) {
        if (setActive) {
          await setActive({ session: signedin.createdSessionId });
          router.push('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });
  return (
    <div className={"grid gap-6"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
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
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-3 mb-6">
                    <FormControl>
                      <Input
                        className="bg-transparent text-whiteShade "
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
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        className="text-whiteShade bg-[transparent]"
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() =>
          signOut(() => {
            console.log("signed out");
          })
        }
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
};

export default SigninForm;
