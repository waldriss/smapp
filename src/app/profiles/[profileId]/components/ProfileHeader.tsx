import React from "react";
import img from "@public/images/glacier-aurora-aurora-borealis-night.jpg";
import Image from "next/image";
import {
  ListChecks,
  Plus,
  PlusSquare,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import ProfileImageUploader from "./ProfileImageUploader";
import FollowButtons from "./FollowButtons";
import { FollowedRequest } from "@/lib/types/user";
import FollowRequestsList from "./FollowRequestsList";
import LoadingSvg from "@/components/Generalcomponents/LoadingSvg";

const ProfileHeader = ({
  profileId,
  AuthId,
  isProfileOfAuth,
  userImage,
  isEdit,
  setisEdit,
  form,
  followedBy,
  isUpdatingUser,
}: {
  profileId: number;
  AuthId?: string | null;
  isProfileOfAuth?: boolean;
  userImage?: string;
  isEdit: boolean;
  setisEdit: (value: boolean) => void;
  form?: any;
  followedBy?: FollowedRequest[];
  isUpdatingUser?: boolean;
}) => {
  const AuthenticatedFollowRequest = followedBy?.find(
    (followRequest) => followRequest.follower.id.toString() == AuthId
  );
  const followRequestsList = followedBy?.filter(
    (followRequest) => followRequest.state === "pending"
  );
  return (
    <div className="w-full bg-gradient-to-t from-backgroundgrad1 to-backgroundgrad2 h-60 md:h-40 relative mb-5 sm:mb-8">
      <div className="absolute rounded-full circle w-40 h-40  sm:w-56 sm:h-56 lg:w-72 lg:h-72 border-solid border-backgroundgrad2 border-[12px] bg-white bottom-0 translate-y-1/2 left-2 sm:left-10">
        <Image
          alt="OM"
          className="w-full h-full rounded-full border-1 border-solid border-whiteShade"
          width={800}
          height={800}
          src={userImage ? userImage : img.src}
        />
        {isEdit && (
          <>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="pt-7">
                  <FormControl>
                    <ProfileImageUploader
                      fieldChange={field.onChange}
                      mediaUrl={userImage ? userImage : undefined}
                      isUpdatingUser={isUpdatingUser}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}
      </div>

      {/* <div className="absolute right-0 bottom-0 pr-6 pb-5 flex lg:hidden gap-x-8">
        <PlusSquare className=" text-whiteShade cursor-pointer w-8 h-8 md:w-10 md:h-10" />

        <SlidersHorizontal className="text-whiteShade cursor-pointer w-8 h-8 md:w-10 md:h-10" />
              </div>*/}
      {isProfileOfAuth != undefined && (
        <div className="absolute right-0 bottom-0 pr-6 pb-5 flex lg:hidden gap-x-8">
          {!isProfileOfAuth ? (
            AuthId && (
              <FollowButtons
                AuthenticatedFollowRequest={AuthenticatedFollowRequest}
                profileId={profileId}
                AuthId={AuthId}
              />
            )
          ) : !isEdit ? (
            <>
              {followRequestsList && (
                <FollowRequestsList
                  profileId={profileId}
                  followRequestsList={followRequestsList}
                />
              )}
              <SlidersHorizontal
                onClick={() => {
                  setisEdit(true);
                }}
                className="text-whiteShade cursor-pointer w-8 h-8 md:w-9 md:h-9"
              />
            </>
          ) : (
            <>
              {isUpdatingUser ? (
                <LoadingSvg
                  isWhite
                  className=" text-whiteShade cursor-pointer w-8 h-8 md:w-9 md:h-9"
                />
              ) : (
                <X
                  onClick={() => {
                    setisEdit(false);
                  }}
                  className=" text-whiteShade cursor-pointer w-8 h-8 md:w-9 md:h-9"
                />
              )}

              {isUpdatingUser ? (
                <LoadingSvg
                  isWhite
                  className=" text-whiteShade cursor-pointer w-8 h-8 md:w-9 md:h-9"
                />
              ) : (
                <button type="submit">
                  <ListChecks className=" text-whiteShade cursor-pointer w-8 h-8 md:w-9 md:h-9" />
                </button>
              )}
            </>
          )}
        </div>
      )}

      {isProfileOfAuth != undefined && (
        <div className="hidden lg:flex  absolute right-0 bottom-0 pr-6 pb-5 gap-x-8">
          {!isProfileOfAuth ? (
            AuthId && (
              <FollowButtons
                AuthenticatedFollowRequest={AuthenticatedFollowRequest}
                profileId={profileId}
                AuthId={AuthId}
              />
            )
          ) : !isEdit ? (
            <>
              {followRequestsList && (
                <FollowRequestsList
                  profileId={profileId}
                  followRequestsList={followRequestsList}
                />
              )}
              <Button
                className="font-sans text-base bg-primary rounded-full py-6 px-6"
                onClick={() => {
                  setisEdit(true);
                }}
              >
                <SlidersHorizontal className="mr-2 h-5 w-6" />
                <span className="text-base"> Edit profile </span>
              </Button>
            </>
          ) : (
            <>
              <Button
                className="bg-primary font-sans rounded-full py-6 px-4"
                onClick={() => {
                  setisEdit(false);
                }}
                disabled={isUpdatingUser}
              >
                {isUpdatingUser ? (
                  <LoadingSvg isWhite className=" h-6 w-6" />
                ) : (
                  <X className=" h-6 w-6" />
                )}
                <span className="text-base"> </span>
              </Button>
              <Button
                className="bg-primary font-sans rounded-full py-6 px-6"
                type="submit"
                disabled={isUpdatingUser}
              >
                {isUpdatingUser ? (
                  <LoadingSvg isWhite className=" h-6 mr-2 w-6" />
                ) : (
                  <ListChecks className="mr-2 h-6 w-6" />
                )}
                <span className="text-base"> Submit </span>
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
