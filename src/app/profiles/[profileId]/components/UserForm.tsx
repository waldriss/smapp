"use client";
import { FollowedRequest, FollowerRequest, TUser } from "@/lib/types/user";
import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileInfos from "./ProfileInfos";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "@/lib/react-query/mutations";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { generateUniqueId } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
  username: z.string().min(8, {
    message: "username must be at least 8 characters.",
  }),
  name: z.string().min(6, {
    message: "name must be at least 6 characters.",
  }),
  bio: z.string().optional(),
  file: z.custom<File[]>().optional(),
});

const UserForm = ({
  isAuth,
  user,
  isEdit,
  setisEdit,
  followers,
  following
}: {
  isAuth: boolean | undefined;
  user: TUser;
  isEdit: boolean;
  setisEdit: (value: boolean) => void;
  followers:FollowedRequest[];
  following:FollowerRequest[]
}) => {
  const toastContent = (message: string, id: string) => (
    <div className="w-full">
      <h4 className="font-semibold text-whiteShade text-base ">
        Editing User
      </h4>
      <div className="flex items-center justify-between w-full">
        <p className="text-muted-foreground text-[0.95rem]">{message}</p>
        <Button onClick={() => toast.dismiss(id)} size={"sm"}>
          Undo
        </Button>
      </div>
    </div>
  );
  const { user: authentifiedUser } = useUser();
  const { getToken } = useAuth();
  const { mutateAsync: updateUser,isPending:isUpdatingUser } = useUpdateUser(user.id,getToken);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      bio: user.bio,
      file: [],
    },
  });

  const onSubmit = async (formUser: z.infer<typeof formSchema>) => {
    if (authentifiedUser?.externalId) {
      if (parseInt(authentifiedUser.externalId) === user.id) {
        const updatedUser = await updateUser({
          name: formUser.name,
          username: formUser.username,
          bio: formUser.bio,
          file: formUser.file?.length === 0 ? undefined : formUser.file,
        });
        if(updatedUser){
          const id = generateUniqueId();
          toast(
            toastContent(
              "Changes saved successfully. Your profile is now updated!",
              id
            ),
            { position: "bottom-center", id: id }
          );
          
          setisEdit(false);
        }
      }
    }

    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ProfileHeader
          isProfileOfAuth={isAuth}
          isEdit={isEdit}
          setisEdit={setisEdit}
          userImage={user?.userImage}
          form={form}

          profileId={user.id}
          isUpdatingUser={isUpdatingUser}

        />
        <ProfileStats profileId={user.id} postsNb={user.posts.length} followers={followers} following={following}  />
        <ProfileInfos
          form={form}
          isEdit={isEdit}
          name={user.name}
          userName={user.username}
          isUpdatingUser={isUpdatingUser}
        />
      </form>
    </Form>
  );
};

export default UserForm;
