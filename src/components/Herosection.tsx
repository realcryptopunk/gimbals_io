
import { Link} from "@nextui-org/react";
import Wordchanger from "~/components/Wordchanger/wordchanger";
import NextLink from "next/link";
import { button as buttonStyles } from "@nextui-org/theme";



export default function HeroSection() {
    return (
        <section>

        
<div className="inline-block max-w-lg text-center justify-center">
        <span className="text-6xl font-bold">
          Find&nbsp;
        </span>
        <Wordchanger />
        <span className="text-6xl font-bold">creators for your next shoot.</span>
        <h2 className="font-bold text-1xl">Explore hundreds of videographers, editors, content creators, film. </h2>
      </div>

      <div className="flex gap-3">
        <Link 
          as={NextLink}
          href="/"
          className={`${buttonStyles({
            color: "danger",
            radius: "full",
            variant: "shadow",
          })} font-semibold`}
        >
          Find a job
        </Link>
        <Link
           as={NextLink}
           href="/"
           className={`${buttonStyles({
            color: "default",
            radius: "full",
            variant: "flat",
          })} font-semibold`}
        >
          Post a job
        </Link>
        
      </div>
      </section>
    );
}