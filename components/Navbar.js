import * as React from "react";
import siteLogo from '../public/logo-sciencemesh.svg'
import Image from "next/image";
import NavLink from "./NavLink";
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { name: "About ScienceMesh", to: "https://sciencemesh.io" },
  {
    name: "Contact",
    to: "https://cs3mesh4eosc.eu/contact",
    variant: "dark",
  },
];

const MOBILE_LINKS = [{ name: "Home", to: "/", current: true }, ...NAV_LINKS];

export default function Navbar () {
  return (
    <header className="fixed top-0 z-30 mx-auto w-full bg-white bg-opacity-95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex flex-grow items-center">
          <NavLink to="/" current className="flex items-center py-2 md:pl-4">
            <Image
              className="block h-8 w-auto"
              src={siteLogo}
              layout="fixed"
              height={65}
              width={200}
              priority={true}
              alt="ScienceMesh Logo"
            />
            <span className="hidden text-2xl font-medium uppercase md:inline-block">
              Directory
            </span>
          </NavLink>
        </div>
        <div className="hidden grid-flow-col items-center gap-2 text-xs sm:grid sm:text-sm md:pr-6">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.name} {...item} />
          ))}
        </div>
        <div className="flex items-center justify-center sm:hidden">
          <MobileMenu links={MOBILE_LINKS} />
        </div>
      </nav>
    </header>
  )
}
