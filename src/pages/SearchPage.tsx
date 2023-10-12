import Head from "next/head";


import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Layout from "~/components/layout";

import { type NextPage } from "next";
import { LoadingMessage, ErrorMessage } from "~/components/ErrorMessage";
import { MuliColumnVideo } from "~/components/VideoComponent";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const searchQuery = router.query.q;
  const { data, isLoading, error } = api.video.getVideoSBySearch.useQuery(
    searchQuery as string,
  );

  const [searchInput, setSearchInput] = useState("");


  const handleSearch = async () => {
    try {
      await router.push({
        pathname: "/SearchPage",
        query: { q: searchInput },
      });
    } catch (error) {
      console.error("Error navigating to search page:", error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void handleSearch();
    }
  };
  
  const Error = () => {
    if (isLoading) {
      return (
        <div className="mx-auto grid grid-cols-1 items-center justify-center gap-4 gap-x-10 gap-y-8 py-8 md:mx-0 md:max-w-none md:grid-cols-2 md:py-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:max-w-none xl:grid-cols-3 2xl:mx-0 2xl:max-w-none 2xl:grid-cols-3">
          <LoadingMessage />
          <LoadingMessage />
          <LoadingMessage />
          <LoadingMessage />
          <LoadingMessage />
          <LoadingMessage />
        </div>
      );
    }
    if ((error ?? !data) || (data?.videos?.length ?? 0) === 0) {
      return (
        <ErrorMessage
          icon="GreenPlay"
          message="No Videos"
          description="Sorry try another search result"
        />
      );
    }
    return <></>;
  };

  return (
    <>
      <Head>
        <title>Gimbals.io</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>

      
      <section className="flex flex-col items-center justify-center gap-4 ">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          <div className="flex  sm:w-[740px] w-[340px] h-[240px] px-2 sm:px-8 rounded-2xl flex-col justify-center items-center ">
  <h1 className="flex justify-center py-5 text-4xl sm:text-5xl">
    {typeof searchQuery === "string"
      ? searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)
      : ""}
  </h1>
  <h2 className="text flex justify-center pb-5 text-gray-500">
    Explore videos related to {searchQuery}.
  </h2>
  <Input
    classNames={{
      base: "w-full sm:w-3/4 h-10",
      mainWrapper: "h-full",
      input: "text-small",
      inputWrapper:
        "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
    }}
    placeholder="Type to search..."
    size="lg"
    startContent={<SearchIcon size={18} />}
    type="search"
    onChange={(e: ChangeEvent<HTMLInputElement>) =>
      setSearchInput(e.target.value)
    }
    onKeyDown={handleKeyDown}
  />
</div>
          </div>
          <div className="p-10">
            {!data || (data?.videos?.length ?? 0) === 0 ? (
              <Error />
            ) : (
              <>
                <MuliColumnVideo
                  videos={data.videos.map((video) => ({
                    id: video?.id ?? "",
                    title: video?.title ?? "",
                    thumbnailUrl: video?.thumbnailUrl ?? "",
                    createdAt: video?.createdAt ?? new Date(),
                    views: video?.views ?? 0,
                  }))}
                  users={data.users.map((user) => ({
                    name: user?.name ?? "",
                    image: user?.image ?? "",
                  }))}
                />
              </>
            )}
          </div>
        </div>
      </section>
      </Layout>

    </>
  );
};

export default SearchPage;


