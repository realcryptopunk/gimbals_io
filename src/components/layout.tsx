import Nav from '~/components/Navbar/navbar';
import React from 'react';

interface LayoutProps {
    children: JSX.Element;}

    export default function Layout({ children }: LayoutProps) {
    return(
        <>
        <Nav/>

    
        <main >
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="space-x-4">{children}</div>
          </div>
        </main>
        </>
    )};