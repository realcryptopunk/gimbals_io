import React from "react";
import Image from "next/image";
import {Card} from "@nextui-org/react";

export function Thumbnail({ thumbnailUrl }: { thumbnailUrl: string }) {
  return (
    <Card className=" relative inset-0 h-0 w-full pb-[50%]">
      <Image
        src={thumbnailUrl || "/background.jpg"}
        alt="Alternative"
        fill
        className="absolute inset-0 left-0 top-0 rounded-2xl"
      />
    </Card>
  );
}
