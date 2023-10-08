import Link from "next/link";
import { useState, useRef, useEffect } from 'react';

import Filterbutton from "./filterbutton";

const categories = [
  'Following',
  'Discover',
  'Animation',
  'Branding',
  'Illustration',
  'Mobile',
  'Print',
  'Product Design',
  'Typography',
  'Web Design'
];

const CatNavbar: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);


  const checkIfOverflow = () => {
    
    const navbar = navbarRef.current;
    if (navbar) {  // Check added here
      if (navbar.scrollWidth > navbar.clientWidth) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };
  

  useEffect(() => {
    checkIfOverflow();
    window.addEventListener("resize", checkIfOverflow);

    return () => {
      window.removeEventListener("resize", checkIfOverflow);
    };
  }, []);

  return (
    <div className="relative">
      
        <div 
            ref={navbarRef} 
            className={`flex ${showMore ? 'justify-start' : 'justify-center'} overflow-x-auto whitespace-nowrap space-x-4 px-2 py-2 scrollbar-hide`}
        >
          <Filterbutton />
            {categories.map((category, index) => (
                <Link legacyBehavior href={`/${category.toLowerCase()}`} key={index} target="_self">
                <a className="py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">{category}</a>
            </Link>
            ))}
        </div>
        {showMore && (
            <div className="absolute top-2 right-0 bg-gradient-to-l from-transparent to-white p-2">
                <button className="text-gray-500" onClick={() => navbarRef.current?.scrollBy({ left: 100, behavior: 'smooth' })}>→</button>
            </div>
        )}
    </div>
);
        };

export default CatNavbar;
