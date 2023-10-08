

import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

import { GreenHorn, GreenPeople, GreenPlay } from "./Icons/Icons";

export function ErrorMessage({
  children,
  message,
  description,
  icon,
}: {
  children?: React.ReactNode;
  icon?: string;
  message: string;
  description?: string;
}) {
  const IconSelection = ({
    icon,
    className,
  }: {
    icon?: string;
    className: string;
  }) => {
    if (icon === "GreenHorn") {
      return <GreenHorn className={className} />;
    } else if (icon === "GreenPeople") {
      return <GreenPeople className={className} />;
    } else {
      return <GreenPlay className={className} />;
    }
  };

  return (
    <div className="relative mt-16 flex w-full  flex-col items-center justify-center gap-2 text-center">
      <IconSelection className="center items-center" icon={icon} />
      <h1 className="text-2xl font-semibold text-gray-900">{message}</h1>
      <p className="max-w-xs text-gray-600">{description}</p>
      {children}
    </div>
  );
}

export function LoadingMessage() {
  return (
    <div className="flex flex-col gap-3">
    <Card className="w-[200px] space-y-5 p-4" radius="lg">
      <Skeleton  className="rounded-lg">
        <div className="h-24 rounded-lg bg-secondary"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton  className="w-3/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
        </Skeleton>
        <Skeleton  className="w-2/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
        </Skeleton>
      </div>
    </Card>
    
  </div>
  );
}
