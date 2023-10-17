import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "~/utils/api";
import { LoadingMessage, ErrorMessage } from "~/components/ErrorMessage";
import { type NextPage } from "next";
import ReactPlayer from "react-player";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "~/components/Layout";
import {Card, CardHeader, CardBody, CardFooter, Avatar,  Link, Divider} from "@nextui-org/react";
import { UserName,VideoInfo,VideoTitle} from "~/components/VideoComponent";
import FollowButton from "~/components/FollowButton";
import LikeButton from "~/components/LikeButton";
import Description from "~/components/Description";
import CommentSection from "~/components/CommentSection";

const VideoPage: NextPage = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const { data: sessionData } = useSession();



  const {
    data: videoData,
    isLoading: videoLoading,
    error: videoError,
    refetch: refetchVideoData,
  } = api.video.getVideoById.useQuery(
    {
      id: videoId as string,
      viewerId: sessionData?.user.id,
    },
    {
      enabled: !!videoId && !!sessionData?.user?.id,
    },
  );
  const addViewMutation = api.videoEngagement.addViewCount.useMutation();
  const addView = (input: {id: string, userId:string}) => {
    addViewMutation.mutate(input);
  }

  useEffect(() => {
    if (videoId) {
        void refetchVideoData();
        addView({
            id: videoId as string, 
            userId: sessionData ? sessionData.user.id : ""
        });
    }
}, [videoId]);


  const video = videoData?.video;
  const user = videoData?.user;
  const viewer = videoData?.viewer;
  const errorTypes = !videoData || !user || !video || !viewer  ;


  const DataError = () => {
    if (videoLoading) {
      return (
        <div className="mx-auto lg:flex justify-center">
             <div className="w-full sm:px-4  lg:w-4/5 ">
            <div className="py-4">
          <LoadingMessage />
          </div>
          </div>

        </div>
      );
    } else if (errorTypes) {
      return (
        <ErrorMessage
          icon="GreenPlay"
          message="No Video"
          description="Sorry there is an error loading video"
        />
      );
    }
    return <></>;
  };

  return (
    <>
      <Head>
        <title>{video?.title}</title>
        <meta name="description" content={user?.description ?? ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <main className="flex lg:flex max-width justify-center gap-4" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {errorTypes ? (
            <DataError />
          ) : (
            <>
            <div className="w-full sm:px-4  lg:w-4/5 ">
            <div className="py-4">
                <ReactPlayer
                  controls={true}
                  style={{borderRadius: "1rem", overflow: "hidden"}}
                  width={"100%"}
                    height={"100%"}
                    url={video.videoUrl ?? ""}
                    />
            </div>
            <Card > 
      <CardHeader className="justify-between">
        <div className="flex gap-5">
            <Link
            href={`/${video.userId}/ProfileVideos`}
            key={video.userId}>
            <Avatar isBordered radius="full" size="md" src={user.image ?? ""} />
            </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
            <VideoTitle title={video?.title ?? ""} />
            <UserName name={user?.name ?? ""} />
            <div className="flex gap-1">
            <p className="font-semibold text-small">{user.followers}</p>
            <p className=" text-small">Followers</p>
            </div>
          </div>
        </div>
      
    
        <div className="flex gap-1">
        <FollowButton 
        followingId={video.userId}
        viewer={{hasFollowed: viewer.hasFollowed}}/>
        <LikeButton
        EngagementData={{
            id: video.id,
            likes: video.likes,
            dislikes: video.dislikes,
        }}
        viewer={{hasLiked: viewer.hasLiked, hasDisliked: viewer.hasDisliked}}
        />
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small">
      <VideoInfo
            views={video.views}
            createdAt={video.createdAt}/>
    
       
      </CardBody>
     
      <CardFooter className="gap-1 col-auto flex flex-col">
      <Divider/>
        <Description 
        text={video.description ?? ""}
        length={200}
        border={true}
        />
      </CardFooter>
    </Card>
    <div>
      <CommentSection
      videoId={video.id}
      comments={videoData.comments.map(( {user, comment}) => ({
        comment: {
          id: comment.id,
          message: comment.message,
          createdAt: comment.createdAt,
        },
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
          handle: user.handle,
        },
      }))}
      refetch={refetchVideoData}
      />
    </div>
    
            </div>
            </>
          )}
        </main>
      </Layout>
    </>
  );
};

export default VideoPage;
