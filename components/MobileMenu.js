import * as React from 'react'
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { Menu, Transition } from '@headlessui/react'


export default function MobileMenu ({ links }) {
    return (
        <div className="w-auto text-left">
            <Menu as="div" className="relative inline-block text-left px-2">
                {({ open }) => (
                    <>
                        <div>
                            <Menu.Button className="inline-flex justify-center border-gray-light border rounded-md bg-white bg-opacity-20 px-4 py-2 text-sm font-medium text-gray hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                {open ? (
                                    <HiOutlineX aria-hidden="true" className="block h-6 w-6" />
                                ) : (
                                    <HiMenu aria-hidden="true" className="block h-6 w-6" />
                                )}
                            </Menu.Button>
                        </div>
                        <Transition
                            show={open}
                            as={React.Fragment}
                            enter="transition-height ease-out duration-150"
                            enterFrom="transform h-0"
                            enterTo="transform h-screen"
                            leave="transition-height ease-in duration-150"
                            leaveFrom="transform h-0"
                            leaveTo="transform h-screen"
                        >
                            <Menu.Items static className="fixed w-screen top-0 mt-20 left-0 bg-white focus:outline-none z-50">
                                {links.map(link => (
                                    <Menu.Item key={link.to} as={React.Fragment}>
                                        {({ active }) => (
                                            <a className={`${active ? 'bg-blue text-white' : 'text-gray'} flex w-full items-center px-4 py-4 text-md`} href={link.to}>{link.name}</a>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </>)}
            </Menu>
        </div >
    )
}
