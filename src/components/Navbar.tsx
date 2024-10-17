'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { User } from 'next-auth'
import { Button } from './ui/button'
import Image from 'next/image'
// import logo from '/Logo'

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: session } = useSession();
    const user: User = session?.user as User;

    useEffect(() => {
        const handleScroll = () => {
          const show = window.scrollY > 50;
          if (show) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        };
    
        document.addEventListener("scroll", handleScroll);
        return () => {
          document.removeEventListener("scroll", handleScroll);
        };
      }, []);

    return (  
        <nav className={`w-full p-4 md:p-6 bg-orange-600 text-white sticky top-0 shadow-lg z-40 border-b-2 border-white ${
            isScrolled
              ? "bg-opacity-40 bg-black backdrop-blur-md shadow-sm transition-all ease-in-out"
              : ""
          }`}>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a href="#" className="text-2xl font-bold mb-4 md:mb-0 text-white">
                    {/* <Image src={logo} alt="logo" width={100} height={100}/> */}
                    ShadowSpeak
                </a>
                {session ? (
                    <>
                        <span className="mr-4 text-gray-400">Welcome {user?.username || user?.email}</span>
                        <Button
                            onClick={() => signOut()}
                            className="w-full md:w-auto transition-all ease-in-out hover:scale-110  text-white border-white bg-black"
                            variant="outline"
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button
                            className="w-full md:w-auto transition-all ease-in-out hover:scale-110  text-white border-white bg-black"
                            variant="outline"
                        >
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
