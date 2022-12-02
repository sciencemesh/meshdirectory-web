import * as React from 'react'
import siteLogo from '#/img/logo.svg'
import Image from 'next/legacy/image'
import NavLink from '@/components/dom/NavLink'
import MobileMenu from '@/components/dom/MobileMenu'

const NAV_LINKS = [
  { name: 'About ScienceMesh', href: 'https://sciencemesh.io' },
  {
    name: 'Contact',
    href: 'https://cs3mesh4eosc.eu/contact',
    variant: 'dark',
  },
]

const MOBILE_LINKS = [{ name: 'Home', href: '/', current: true }, ...NAV_LINKS]

export default function Navbar() {
  return (
    <header className='sticky top-0 z-30 w-full bg-white/50 bg-opacity-95 text-secondary-dark backdrop-blur-md '>
      <nav className='flex items-center justify-between w-full mx-auto h-28 max-w-7xl sm:px-6 lg:px-8'>
        <div className='flex items-center flex-grow'>
          <NavLink href='/' current className='flex items-center'>
            <Image
              className='block w-auto h-12 pr-2'
              src={siteLogo}
              layout='fixed'
              height={72}
              width={200}
              priority={false}
              alt='ScienceMesh Logo'
            />
            <span className='hidden text-2xl font-medium uppercase md:inline-block'>Directory</span>
          </NavLink>
        </div>
        <div className='items-center hidden text-xs grid-flow-col gap-2 sm:grid sm:text-sm md:pr-6'>
          {NAV_LINKS.map((item) => (
            <NavLink key={item.name} {...item} />
          ))}
        </div>
        <div className='flex items-center justify-center sm:hidden'>
          <MobileMenu links={MOBILE_LINKS} />
        </div>
      </nav>
    </header>
  )
}
