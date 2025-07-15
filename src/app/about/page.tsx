"use client";
import React, { useEffect, useState } from "react";
import { DiMongodb, DiNginx, DiNpm, DiPostgresql, DiVim } from "react-icons/di";
import {
  FaAws,
  FaCss3,
  FaDocker,
  FaEnvelope,
  FaGit,
  FaGithub,
  FaHtml5,
  FaLinkedin,
  FaLinux,
  FaNodeJs,
  FaPhone,
  FaReact,
  FaVuejs,
  FaYarn,
} from "react-icons/fa6";
import {
  RiFirebaseFill,
  RiJavascriptFill,
  RiNextjsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiExpress,
  SiJavascript,
  SiKubuntu,
  SiPm2,
  SiPrettier,
  SiTypescript,
  SiVercel,
  SiVisualstudiocode,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { TbTerminal2 } from "react-icons/tb";
import { SKILLS } from "@/data/constants";

const CONTACT_LINKS = [
  {
    name: "Email",
    content: "nayanmehta2004@gmail.com",
    href: "mailto:nayanmehta2004@gmail.com",
    icon: <FaEnvelope height={"50px"} />,
  },
  {
    name: "Phone",
    content: "8118899048",
    href: "tel:8118899048",
    icon: <FaPhone height={"50px"} />,
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/in/nayan-mehta-6b3959300",
    content: "/nayan-mehta",
    icon: <FaLinkedin height={"50px"} />,
  },
  {
    name: "GitHub",
    href: "https://github.com/nayanm07/nayanm07",
    content: "/nayanm07",
    icon: <FaGithub height={"50px"} />,
  },
];

const TOOLS = Object.values(SKILLS);

function Page() {
  const [toolsLoaded, setToolsLoaded] = useState(false);

  useEffect(() => {
    setToolsLoaded(true);
  }, []);

  // Responsive Splide options
  const getSplideOptions = () => ({
    type: "loop",
    interval: 2000,
    autoplay: true,
    pagination: false,
    speed: 2000,
    perPage: 5,
    perMove: 1,
    rewind: true,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    arrows: false,
    breakpoints: {
      768: {
        perPage: 3,
      },
      480: {
        perPage: 2,
      },
    },
  });

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-[200px] text-zinc-300 pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
        <aside className="w-full lg:w-1/3 xl:w-1/3 lg:flex-shrink-0">
          <div
            className="p-4 md:p-6 lg:p-8 xl:p-10 rounded-2xl border-[.5px] border-zinc-600"
            style={{
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="flex flex-row lg:flex-col items-center">
              <div className="flex justify-center items-center lg:w-full lg:aspect-square bg-zinc-800 rounded-xl lg:mb-5">
                <img
                  className="rounded-full p-3 md:p-4 lg:p-6 xl:p-10 w-[120px] sm:w-[150px] md:w-[180px] lg:w-full max-w-[300px] aspect-square bg-zinc-800"
                  alt="me"
                  src="/assets/me.jpg"
                />
              </div>
              <div className="flex flex-col gap-2 md:gap-3 lg:items-center ml-4 sm:ml-6 md:ml-8 lg:ml-0">
                <p className="text-center text-lg md:text-xl lg:text-2xl font-medium">
                  Nayan Mehta
                </p>
                <div className="text-xs md:text-sm bg-zinc-700 w-fit px-2 md:px-3 py-1 rounded-full">
                  App Developer
                </div>
              </div>
            </div>

            {/* Mobile Contact Links */}
            <div className="md:hidden mt-6">
              <div className="grid grid-cols-2 gap-3 w-full">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.name}
                    className="flex flex-col items-center justify-center p-3 border-zinc-700 bg-zinc-800 hover:border-zinc-600 border-[.5px] rounded-md transition-colors min-h-[80px] text-center"
                    href={link.href}
                  >
                    <div className="w-6 h-6 mb-2 flex items-center justify-center text-zinc-300">
                      {link.icon}
                    </div>
                    <div className="text-xs text-center w-full">
                      <div className="font-medium text-zinc-200 mb-1">
                        {link.name}
                      </div>
                      <div className="text-zinc-400 text-[10px] leading-tight break-words">
                        {link.content}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Contact Links */}
            <div className="hidden md:block">
              <hr className="my-8 xl:my-10 border-zinc-600" />
              <ul className="flex flex-col gap-3">
                {CONTACT_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      className="flex items-center px-3 gap-3 w-full h-12 border-zinc-700 bg-zinc-800 hover:border-zinc-600 border-[.5px] rounded-md transition-colors"
                      href={link.href}
                    >
                      <div className="w-8">{link.icon}</div>
                      <div className="flex flex-col">
                        <div className="text-sm">{link.name}</div>
                        <div className="text-xs text-zinc-500">
                          {link.content}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <main className="w-full lg:w-2/3 xl:w-3/4 lg:flex-shrink-0">
          <div
            className="p-4 md:p-6 lg:p-8 xl:p-10 border-[.5px] rounded-md border-zinc-600"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 lg:mb-10 font-bold">
              About me
            </h1>
            <p className="mb-8 md:mb-10 lg:mb-12 text-roboto text-sm md:text-base leading-relaxed">
              Hi! I&apos;m Nayan, a React Native developer with 1 years of
              experience building cross-platform mobile apps. I have a strong
              background in development, DevOps, and database management, and
              I&apos;m skilled at deploying and automating workflows. I&apos;ve
              worked with international clients, and I bring strong
              problem-solving skills, clear communication, and a collaborative
              mindset to every project.
            </p>

            <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 lg:mb-10 font-bold">
              Stuff I use
            </h1>
            <div className="mb-5">
              {!toolsLoaded ? (
                <div className="h-[60px] md:h-[80px] lg:h-[100px] bg-zinc-800 rounded-md animate-pulse"></div>
              ) : (
                <div className="overflow-hidden">
                  <Splide
                    options={getSplideOptions()}
                    aria-label="My Favorite Images"
                  >
                    {TOOLS.reverse().map((tool) => (
                      <SplideSlide key={tool.name}>
                        <div className="px-2">
                          <div
                            key={tool.name}
                            className="w-fit p-2 md:p-3 border-[.5px] border-zinc-600 rounded-md hover:border-zinc-500 transition-colors mx-auto"
                          >
                            <img
                              src={tool.icon}
                              alt={tool.name}
                              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                            />
                          </div>
                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
