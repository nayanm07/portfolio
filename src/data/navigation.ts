import { config } from "./config";
import { ReactNode } from "react";

interface NavLink {
  title: string;
  link: string;
}

interface SocialLink {
  name: string;
  link: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => ReactNode;
}

export const NAV_LINKS: NavLink[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Projects",
    link: "/projects",
  },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

export const LINKS = {
  sourceCode: config.social.github,
};

export const SOCIALS: SocialLink[] = [];
