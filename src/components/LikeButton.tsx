import React from "react";
import { useEngagementButton } from "~/Hooks/useEngagement";
import { api } from "~/utils/api";
import { Heart } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";

interface LikeDislikeButtonProps {
  EngagementData: {
    id: string;
    likes: number;
    dislikes: number;
  };
  viewer: {
    hasLiked: boolean;
    hasDisliked: boolean;
  };
}

//* change name of component to Video  engagement
export default function LikeDislikeButton({
  EngagementData,
  viewer,
}: LikeDislikeButtonProps) {
  const { likeCount, userChoice, handleLike,  } =
    useEngagementButton({
      EngagementData,
      viewer,
      addLikeMutation: api.videoEngagement.addLike.useMutation(),
      addDislikeMutation: api.videoEngagement.addDislike.useMutation(),
    });

  const { data: sessionData } = useSession();
  return (
 
      <Button
        variant="flat"
        size="sm"
        radius="full"
        onClick={
          sessionData
            ? () =>
                handleLike({
                  id: EngagementData ? EngagementData.id : "",
                  userId: sessionData ? sessionData.user.id : "",
                })
            : () => void signIn()
        }
        className={`flex
        ${
          userChoice.like
            ? "group bg-transparent"
            : "group bg-transparent"
        }`}
      >
        <Heart
          className={`group h-4 w-4 shrink-0 ${
            userChoice.like
              ? "group  stroke-danger fill-danger "
              : "group "
          }`}
        />
        <p className="pl-2">{likeCount}</p>
      </Button>

  );
}
