import * as React from 'react'

import { HiChevronDown, HiOutlineStar, HiStar } from 'react-icons/hi'
import { BiCurrentLocation } from 'react-icons/bi'
import useLocalStorageState from 'use-local-storage-state'
import { Combobox, Transition } from '@headlessui/react'
import ErrorBanner from './ErrorBanner'
import { matches } from '../src/util'

function NoResults ({ }) {
    return <ErrorBanner error={{
        message: 'No ScienceMesh provider found by this name 🤷‍♂️.'
    }} />
}

export default function ProviderSelect ({ providers, selected, onChange }) {
    const [preferredProviders, setPreferred] = useLocalStorageState(
        'cs3.meshdir.preferredProviders', {
        defaultValue: []
    })
    const [query, setQuery] = React.useState('')
    const providersInput = React.useRef(null)
    const providersComboToggle = React.useRef(null)

    const isPreferred = (provider) => preferredProviders.includes(provider.name)

    const filteredProviders =
        query === ''
            ? providers
            : providers.filter((provider) => matches(provider, query))

    const sortedProviders = filteredProviders.sort((a, b) => {
        if (isPreferred(a) && !isPreferred(b)) return -1;
        if (isPreferred(b) && !isPreferred(a)) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    })

    function togglePreferred (event, provider) {
        event.preventDefault()

        setPreferred(currentPreferred => isPreferred(provider)
            ? currentPreferred.filter(p => p !== provider.name)
            : [...currentPreferred, provider.name])
    }

    React.useEffect(() => {
        providersInput.current.focus()
        // https://github.com/tailwindlabs/headlessui/discussions/1236
        providersComboToggle.current.click()
    }, [])

    return (
        <Combobox value={selected} onChange={onChange}>
            {({ open }) => (
                <>
                    <div className="flex flex-col">
                        <div className="relative w-full cursor-default overflow-hidden bg-white text-left border-dotted border-b-2 border-b-blue focus:outline-none focus:ring-2 focus:ring-orange sm:text-sm">
                            <Combobox.Input
                                ref={providersInput}
                                aria-label="Enter your ScienceMesh site"
                                className='w-full border-none py-2 pr-10 text-4xl leading-5 focus:ring-0 truncate text-blue-dark focus:outline-none '
                                onChange={(event) => setQuery(event.target.value)}
                                displayValue={(provider) => provider?.fullName}
                            />
                            <Combobox.Button
                                ref={providersComboToggle}
                                title="Expand"
                                arial-label="Expand"
                                className="absolute inset-y-0 right-1 flex items-center"
                            >
                                <HiChevronDown
                                    className="h-5 w-5 text-blue-dark z-10 bg-white rounded-full hover:text-gray-dark"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                            <button
                                title="Find nearest"
                                aria-label='Find nearest'
                                className='absolute inset-y-0 my-4 right-10 text-blue-dark hover:text-gray-dark focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-0'
                            >
                                <BiCurrentLocation
                                    aria-hidden="true"
                                    className='h-5 w-5 z-10 p-y-10 bg-white rounded-full'
                                />
                            </button>
                        </div>
                        <Transition
                            show={open}
                            as={React.Fragment}
                            enter="transition duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options
                                static
                                className="mt-2 max-h-60 w-full border-t-0 shadow-sm overflow-auto rounded-sm border-10 bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {sortedProviders.length === 0 && query !== '' ? (
                                    <NoResults query={query} />
                                ) : (
                                    filteredProviders.map((provider) => (
                                        <Combobox.Option
                                            key={provider.name}
                                            value={provider}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-dark text-white' : 'text-gray-900'}`}>
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-semibold text-lg' : 'font-normal'}`}>
                                                        {provider.fullName}
                                                    </span>
                                                    <button
                                                        aria-hidden="true"
                                                        tabIndex="-1"
                                                        onClick={(e) => togglePreferred(e, provider)}
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 z-20 ${isPreferred(provider) ? 'text-yellow-500' : 'text-white'}`}
                                                    >
                                                        {
                                                            isPreferred(provider)
                                                                ? (<HiStar className="h-5 w-5" aria-hidden="true" />)
                                                                : (<HiOutlineStar className="h-5 w-5" aria-hidden="true" />)
                                                        }
                                                    </button>
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Combobox>
    )
}