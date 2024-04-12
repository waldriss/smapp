import { useDisLikePost, useLikePost } from "@/lib/react-query/mutations";
import { UseToken } from "@/lib/store/store";
import { Liker } from "@/lib/types/Post";
import { useAuth, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const AnimatedHeart = ({
  subclass,
  likers,
  postId,
  setlikesNumber,
}: {
  subclass?: string;
  likers: Liker[];
  postId: number;
  setlikesNumber:any
}) => {

  const { user } = useUser();
  const { getToken } = useAuth();
 

  const checkIsLiked = likers.some(
    (liker) => liker.likerId.toString() === user?.externalId
  );

  const [isLiked, setisLiked] = useState(checkIsLiked);

  const { mutateAsync: likePost } = useLikePost(user?.externalId?user.externalId:"",getToken);
  const { mutateAsync: dislikePost } = useDisLikePost(user?.externalId?user.externalId:"",getToken);
  useEffect(() => {
    if (checkIsLiked != isLiked) {
      setisLiked(checkIsLiked);
    }
  }, [checkIsLiked]);

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (user?.externalId) {
      if (!isLiked) {
        setisLiked(true);
        setlikesNumber((prev:any)=>prev+1)

        await likePost({
          postId: postId,
          userId: parseInt(user.externalId),
        });
      } else {
        setisLiked(false);
        setlikesNumber((prev:any)=>prev-1)
        await dislikePost({
          postId: postId,
          userId: parseInt(user.externalId),
        });
      }
    }
  };

  return (
    <div className="relative ">
      <input
        type="checkbox"
        id="checkbox"
        checked={isLiked}
        readOnly
        style={{ pointerEvents: "none" }}
      />
      <label htmlFor="checkbox">
        <svg
          className={subclass}
          id="heart-svg"
          viewBox="467 392 58 57"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
        >
          <g
            id="Group"
            fill="none"
            fill-rule="evenodd"
            transform="translate(467 392)"
          >
            <path
              d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
              id="heart"
              fill="none"
              className={`stroke-[3px] ${
                !isLiked ? "stroke-whiteShade " : "stroke-primary"
              }`}
            />
            <circle
              id="main-circ"
              fill="#847996"
              opacity="0"
              cx="29.5"
              cy="29.5"
              r="1.5"
            />

            <g id="grp7" opacity="0" transform="translate(7 6)">
              <circle id="oval1" fill="#847996" cx="2" cy="6" r="2" />
              <circle id="oval2" fill="#847996" cx="5" cy="2" r="2" />
            </g>

            <g id="grp6" opacity="0" transform="translate(0 28)">
              <circle id="oval1" fill="#847996" cx="2" cy="7" r="2" />
              <circle id="oval2" fill="#847996" cx="3" cy="2" r="2" />
            </g>

            <g id="grp3" opacity="0" transform="translate(52 28)">
              <circle id="oval2" fill="#847996" cx="2" cy="7" r="2" />
              <circle id="oval1" fill="#847996" cx="4" cy="2" r="2" />
            </g>

            <g id="grp2" opacity="0" transform="translate(44 6)">
              <circle id="oval2" fill="#847996" cx="5" cy="6" r="2" />
              <circle id="oval1" fill="#847996" cx="2" cy="2" r="2" />
            </g>

            <g id="grp5" opacity="0" transform="translate(14 50)">
              <circle id="oval1" fill="#847996" cx="6" cy="5" r="2" />
              <circle id="oval2" fill="#847996" cx="2" cy="2" r="2" />
            </g>

            <g id="grp4" opacity="0" transform="translate(35 50)">
              <circle id="oval1" fill="#847996" cx="6" cy="5" r="2" />
              <circle id="oval2" fill="#847996" cx="2" cy="2" r="2" />
            </g>

            <g id="grp1" opacity="0" transform="translate(24)">
              <circle id="oval1" fill="#847996" cx="2.5" cy="3" r="2" />
              <circle id="oval2" fill="#847996" cx="7.5" cy="2" r="2" />
            </g>
          </g>
        </svg>
      </label>
    </div>
  );
};

export default AnimatedHeart;
