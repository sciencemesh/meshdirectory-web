import * as React from 'react'
import { HiMenu, HiOutlineX } from 'react-icons/hi'
import { Menu, Transition } from '@headlessui/react'

export default function MobileMenu({ links }) {
  return (
    <div className='w-auto text-left'>
      <Menu as='div' className='relative inline-block px-2 text-left'>
        {({ open }) => (
          <>
            <div>
              <Menu.Button className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-white border border-gray-light rounded-md bg-opacity-20 text-gray hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                {open ? (
                  <HiOutlineX aria-hidden='true' className='block w-6 h-6' />
                ) : (
                  <HiMenu aria-hidden='true' className='block w-6 h-6' />
                )}
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={React.Fragment}
              enter='transition-height ease-out duration-150'
              enterFrom='transform h-0'
              enterTo='transform h-screen'
              leave='transition-height ease-in duration-150'
              leaveFrom='transform h-0'
              leaveTo='transform h-screen'>
              <Menu.Items static className='fixed top-0 left-0 z-50 w-screen mt-20 bg-white focus:outline-none'>
                {links.map((link) => (
                  <Menu.Item key={link.href} as={React.Fragment}>
                    {({ active }) => (
                      <a
                        className={`${
                          active ? 'bg-blue text-white' : 'text-gray'
                        } flex w-full items-center px-4 py-4 text-md`}
                        href={link.to}>
                        {link.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
