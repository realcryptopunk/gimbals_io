import { api } from "~/utils/api";
import moment from "moment";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { UserImage } from "./VideoComponent";
import {Button, Card, Input} from "@nextui-org/react";


interface Comment {
  comment: {
    id: string;
    message: string;
    createdAt: Date;
  };
  user: {
    id: string;
    name: string | null;
    image: string | null;
    handle: string | null;
  };
}

interface CommentSectionProps {
  videoId: string;
  comments: Comment[];
  refetch: () => Promise<unknown>;
}

export default function CommentSection({
  videoId,
  comments,
  refetch,
}: CommentSectionProps) {
  const [commentInput, setCommentInput] = useState("");
  const addCommentMutation = api.comment.addComment.useMutation();
  const { data: sessionData } = useSession();

  if (!videoId) {
    return <div>Loading...</div>;
  }

  const addComment = (input: {
    videoId: string;
    userId: string;
    message: string;
  }) => {
    addCommentMutation.mutate(input, {
      onSuccess: () => {
        void refetch();
        setCommentInput("");
      },
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment({
      videoId: videoId,
      userId: sessionData ? sessionData.user.id : ("none" as string),
      message: commentInput,
    });
  };

  return (
    <>
      <div className="py-5 ">
      <Card className="flex space-x-3 rounded-2xl p-6 shadow-lg ">
          <div className="min-w-0 flex-1 space-y-3">
            <p className="block text-sm font-medium leading-6">
              {comments.length}
              <span> Comments</span>
            </p>

            {sessionData ? (
              <form onSubmit={handleCommentSubmit}>
                <div className="mt-2 flex flex-row gap-2">
                  <div className="w-full">
                    <Input
                      size="sm"
                      name="comment"
                      id="comment"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                     
                      placeholder="Add A Comment"
                    />
                  </div>
                  <div className="flex-shrink-0">
                  <Button variant="shadow" color="danger" radius="full" size="sm" type="submit">
                      Comment
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <button
                onClick={!sessionData ? () => void signIn() : () => ""}
                className="align block w-full rounded-md border-0 p-4 py-1.5 text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
              >
                Add A Comment
              </button>
            )}
            {comments
              .sort(
                (a, b) =>
                  new Date(b.comment.createdAt).getTime() -
                  new Date(a.comment.createdAt).getTime()
              )
              .map(({ user, comment }) => (
                <div className="my-6" key={comment.id}>
                  <div className="my-4 border-t dark:border-gray-700 border-gray-200" />
                  <div className="flex gap-2">
                    <UserImage image={user.image ?? ""} />
                    <div className="flex w-full flex-col text-sm ">
                      <div className="flex flex-col ">
                        <div className="flex flex-row gap-2  ">
                          <p className="w-max font-semibold leading-5 ">
                            {user.name}
                          </p>
                          <p className="text-xs dark:text-gray-300 text-gray-800" >
                            {moment(comment.createdAt).fromNow()}
                          </p>
                        </div>
                       
                      </div>
                      <p className="my-2">{comment.message}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </>
  );
}
