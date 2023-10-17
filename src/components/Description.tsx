import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {Divider} from "@nextui-org/react"

export default function Description({
    text,
    length,
    border,
}: {
    text: string;
    length: number;
    border?: boolean;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

  if( text?.length === 0 || text === null){
    return null;
  } else if (text?.length < length ){
    return (
        <>
          {border ? <div><Divider className="my-4"/></div> : ""}
          <p className="my-3 text-left text-sm font-semibold text-gray-600">
            {text}
          </p>
        </>
      );
    } else {
    return(
    <>
    {border ? <div className="border-b border-blue-50"></div> : ""}
   <div className="relative w-full ">
        <button
            onClick={toggleExpand}
            className = "flex flex-row place-content-evenly"
            >
                <p className={`text-left text-sm  ${
                    !isExpanded ? "line-clamp-3" : ""
                }`}
                >{text}</p>
                <span className="items-end">
                {isExpanded ? <ChevronUp /> : <ChevronDown />}

                </span>
        </button>

   </div>
    </>
    )
  }
}
