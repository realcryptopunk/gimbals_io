

import React from "react";
import {Card, Skeleton,Image} from "@nextui-org/react";


export function ErrorMessage({
  children,
  description,
}: {
  children?: React.ReactNode;
  icon?: string;
  message: string;
  description?: string;
}) {
  

  return (
    <div className="relative mt-16 flex w-full  flex-col items-center justify-center gap-2 text-center">
      <Image src="/error.svg" alt="Error" width={500} height={300} />
      <h1 className="text-2xl font-semibold text-gray-900">No Results found</h1>
      <p className="max-w-xs text-gray-600">{description}</p>
      {children}
    </div>
  );
}

export function LoadingMessage() {
  return (
    <div className="flex flex-col items-center justify-between">
    <div className="relative w-full">
    <Card className="w-[5500px] h-[320px] space-y-5 p-4 bg-transparent" radius="lg">
      <Skeleton  className="rounded-2xl">
        <div className="h-[220px] rounded-lg max-w-xl  bg-secondary"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton  className="w-4/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
        </Skeleton>
      </div>
    </Card>
    
  </div>
  </div>
  );
}
