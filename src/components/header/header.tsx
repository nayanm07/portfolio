"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, LINKS, SOCIALS } from "@/data/navigation";
import { config } from "@/data/config";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import OnlineUsers from "../realtime/online-users";
import { Button } from "../ui/button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50  backdrop-blur-md z-50 px-10">
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={70}
            height={70}
            draggable={false}
            className="cursor-pointer"
          />
          <div className="hidden md:flex md:self-center font-bold ml-[10px] text-gray-300">
            {config.author}
          </div>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between md:mr-20">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.link}
              className="cursor-pointer"
            >
              <Button
                variant="ghost"
                className="text-gray-200 hover:text-[rgb(112,66,248)] transition"
              >
                {link.title}
              </Button>
            </Link>
          ))}

            {/* Source Code */}
            {/* <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
            >
              Source Code
            </Link> */}
          
        </div>

        {/* Additional Components */}
        {/* <div className="hidden md:flex items-center gap-4">
          <OnlineUsers />
          <FunnyThemeToggle className="w-6 h-6" />
        </div> */}

        {/* Social Icons (Web) */}

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none text-4xl "
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full  p-5 flex flex-col items-center text-gray-300 md:hidden bg-[#030014b5] backdrop-blur-md">
          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            
          </div>

          
        </div>
      )}
    </div>
  );
};

export default Header;
