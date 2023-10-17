
import { Thumbnail } from "./Thumbnail";
import { Avatar, Link} from  "@nextui-org/react";
import Image from "next/image";
import moment from "moment";
import { LoadingMessage } from "./ErrorMessage";


interface VideoComponentProps {
  videos: {
    id: string;
    title: string;
    thumbnailUrl: string;
    createdAt: Date;
    views: number;
  }[];
  users: {
    image: string;
    name: string;
  }[];
  refetch?: () => Promise<unknown>;
  isLoading?: boolean;
  

}

export function VideoTitle({
  title,
  limitHeight,
  limitSize,
}: {
  title: string;
  limitHeight?: boolean;
  limitSize?: boolean;
}) {
  return (
    <h1
      className={`max-w-md font-semibold leading-6  ${
        limitSize ? "text-base" : "text-lg"
      } ${limitHeight ? "max-h-12 w-full overflow-hidden" : ""}`}
    >
      {title}
    </h1>
  );
}

export function UserName({ name }: { name: string }) {
  return (
    <p className="max-h-6 overflow-hidden text-sm font-semibold leading-6">
      {name}
    </p>
  );
}

export function UserImage({
  image,
  className = "",
}: {
  image: string;
  className?: string;
}) {
  return (
    <div className={`relative h-10 w-10 ${className}`}>
      <Image
        src={image || "/profile.jpg"}
        alt=""
        className="absolute rounded-full"
        fill
      />
    </div>
  );
}

export function VideoInfo({
  views,
  createdAt,
}: {
  createdAt: Date | string;
  views: number;
}) {
  return (
    <div className="mt-1 flex max-h-6 items-start overflow-hidden text-sm">
      <p >
        {views}
        <span> Views</span>
      </p>
      <li className="pl-2 text-sm text-gray-500"></li>
      <p>{moment(createdAt).fromNow().charAt(0).toUpperCase() + moment(createdAt).fromNow().slice(1)}</p>
    </div>
  );
}

export const MuliColumnVideo: React.FC<VideoComponentProps> = ({
  videos,
  users,
  isLoading,
}) => (
  <div className=" mx-auto grid grid-cols-1 gap-x-10 gap-y-8 md:mx-0 md:max-w-none md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:max-w-none xl:grid-cols-3 2xl:mx-0 2xl:max-w-none 2xl:grid-cols-3  ">
    {isLoading ? (
      <LoadingMessage />
    ) : (
    videos.map((video, index) => {
      const user = users[index];
      if (!user) {
        return null;
      }
      return (
        
          <Link
          href={`/video/${video.id}`}
          className="flex flex-col items-start justify-between"
          key={video.id}
          color="foreground"
          
        >
          <div className="relative w-full">
            <Thumbnail thumbnailUrl={video.thumbnailUrl} />
            <div className=" max-w-xl ">
              <div className="items-top relative mt-4 flex gap-x-4 ">
                <Avatar src={user.image || ""} />
                <div className="w-full">
                  <VideoTitle title={video.title} limitHeight={true} />
                  <VideoInfo views={video.views} createdAt={video.createdAt} />
                  <UserName name={user.name || ""} />
                </div>
              </div>
            </div>
          </div>
        </Link>
       
        
        
      );
    })
    )}
  </div>
);

export const SingleColumnVideo: React.FC<VideoComponentProps> = ({
  videos,
  users,
  isLoading,
}) => (
  <div className=" mx-auto grid grid-cols-1 gap-x-10 gap-y-8 md:mx-0 md:max-w-none md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:max-w-none xl:grid-cols-3 2xl:mx-0 2xl:max-w-none 2xl:grid-cols-3  ">
  {isLoading ? (
    <LoadingMessage />
  ) : (
  videos.map((video, index) => {
    const user = users[index];
    if (!user) {
      return null;
    }
    return (
      <Link href={`/video/${video.id}`} key={video.id} color="foreground">
        <div className="my-5 flex flex-col gap-4 hover:bg-gray-100 lg:flex-row">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:w-64 lg:shrink-0">
            <Thumbnail thumbnailUrl={video.thumbnailUrl} />
            <div className=" max-w-xl ">
              <div className="items-top relative mt-4 flex gap-x-4 ">
                <Avatar src={user.image || ""} />
                <div className="w-full">
                  <VideoTitle title={video.title} limitHeight={true} />
                  <VideoInfo views={video.views} createdAt={video.createdAt} />
                  <UserName name={user.name || ""} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </Link>
    )
  }
  )
  )}
  </div>
);
