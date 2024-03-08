"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "./FileUploader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidation } from "@/lib/validations/postvalidations";
import { Button } from "@/components/ui/button";
import { useCreatePost } from "@/lib/react-query/mutations";
import { useUser } from "@clerk/nextjs";
const PostForm = ({ post }: { post?: any }) => {
  const {user } = useUser();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  const {mutateAsync:createPost,isPending:isPendingCreate}=useCreatePost();

  const handleSubmit = async (formPost: z.infer<typeof PostValidation>) => {
    if(user?.externalId){
        console.log("start creating");

      const createdPost=await createPost({
        file:formPost.file,
        caption:formPost.caption,
        location:formPost.location,
        tags:formPost.tags,
        userId:user.externalId
      });
      console.log("created");
      if(!createPost){
        console.log("error creating post");
      }

    }
  
    

  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
        


          <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem className="pt-7">
                    <FormLabel className="text-lg text-whiteShade">Add Caption</FormLabel>
                    <FormControl>
                    <Textarea className="rounded-lg bg-transparent border-[#2e3142] text-whiteShade" {...field}/>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

          

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="pt-7">
                <FormLabel className="text-lg text-whiteShade">Add Photos</FormLabel>
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="pt-7">
                <FormLabel className="text-lg text-whiteShade">Add Location</FormLabel>
                <FormControl>
                  <Input
                    className="bg-transparent text-whiteShade py-6 border-[#2e3142]"
                    placeholder=""
                    type="text"
                    
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="pt-7">
                <FormLabel className="text-lg text-whiteShade">Add Tags</FormLabel>
                <FormControl>
                  <Input
                    className="bg-transparent text-whiteShade py-6 border-[#2e3142]"
                    placeholder=""
                    type="text"
                    
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full pt-10 text-center">
          <Button type="submit" className="py-6 px-10 text-base">
            Create Post
          </Button>

          </div>
          
        </form>
      </Form>
    </>
  );
};

export default PostForm;
