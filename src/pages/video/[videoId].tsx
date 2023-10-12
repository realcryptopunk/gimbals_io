import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import { LoadingMessage, ErrorMessage } from "~/components/ErrorMessage";
import { type NextPage } from "next";
import ReactPlayer from "react-player";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "~/components/layout";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";


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
  const video = videoData?.video;
  const user = videoData?.user;
  const errorTypes = !videoData || !user || !video ;

  const [isFollowed, setIsFollowed] = React.useState(false);
  const DataError = () => {
    if (videoLoading) {
      return (
        <div className="mx-auto grid grid-cols-1 items-center justify-center gap-4 gap-x-10 gap-y-8 py-8 md:mx-0 md:max-w-none md:grid-cols-2 md:py-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:max-w-none xl:grid-cols-3 2xl:mx-0 2xl:max-w-none 2xl:grid-cols-3">
          <LoadingMessage />
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
        <main className="mx-auto lg:flex justify-center ">
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
            <Card 
            className="bg-gray-500 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20  "
             > 
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="danger"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
        </p>
        <span className="pt-2">
          #FrontendWithZoey 
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
            </div>
            </>
          )}
        </main>
      </Layout>
    </>
  );
};

export default VideoPage;
