import { useSharePost, useUnsharePost } from "@/lib/react-query/mutations";

import { Sharer } from "@/lib/types/Post";
import { useAuth, useUser } from "@clerk/nextjs";
import { BookmarkPlus } from "lucide-react";
import React, { useEffect, useState } from "react";

const Share = ({ sharers,postId,className }: { sharers: Sharer[],postId:number,className?:string }) => {
  const { user } = useUser();

  const { getToken } = useAuth();

  const checkIsShared = sharers.some(
    (sharer) => sharer.sharerId.toString() === user?.externalId
  );
  const [isShared, setisShared] = useState(checkIsShared);

  const { mutateAsync: sharePost } = useSharePost(user?.externalId?user.externalId:"",getToken);
  const { mutateAsync: unsharePost } = useUnsharePost(user?.externalId?user.externalId:"",getToken);

  useEffect(() => {
    if (checkIsShared != isShared) {
        setisShared(checkIsShared);
    }
  }, [checkIsShared]);

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (user?.externalId) {
      if (!isShared) {
        setisShared(true);

        await sharePost({
          postId: postId,
          userId: parseInt(user.externalId),
        });
      } else {
        setisShared(false);
        await unsharePost({
          postId: postId,
          userId: parseInt(user.externalId),
        });
      }
    }
  };
  return (
    <BookmarkPlus onClick={handleClick} className={` ${className} ${isShared?'fill-primary stroke-primary':'stroke-whiteShade'} transform active:scale-75 transition-transform cursor-pointer `} />
  );
};

export default Share;
