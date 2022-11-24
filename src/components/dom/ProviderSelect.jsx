import { useState, useRef, useEffect, Fragment } from 'react'
import { HiChevronDown, HiOutlineStar, HiStar } from 'react-icons/hi'
import { BiCurrentLocation, BiLoaderCircle } from 'react-icons/bi'
import useLocalStorageState from 'use-local-storage-state'
import { Combobox, Transition } from '@headlessui/react'
import ErrorBanner from '@/components/dom/ErrorBanner'
import { matches, geoDistance } from '@/util'

const NoResults = ({}) => (
  <ErrorBanner
    error={{
      message: 'No ScienceMesh provider found by this name 🤷‍♂️.',
    }}
  />
)

const ProviderOption = ({ provider }) => (
  <Combobox.Option
    value={provider}
    className={({ active }) =>
      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary-dark text-white' : 'text-gray-900'}`
    }>
    {({ selected }) => (
      <>
        <span className={`block truncate ${selected ? 'font-semibold text-lg' : 'font-normal'}`}>
          {provider.fullName}
        </span>
        <button
          aria-hidden='true'
          tabIndex='-1'
          onClick={(e) => togglePreferred(e, provider)}
          className={`absolute inset-y-0 left-0 flex items-center pl-3 z-20 ${
            isPreferred(provider) ? 'text-yellow-500' : 'text-white'
          }`}>
          {isPreferred(provider) ? (
            <HiStar className='w-5 h-5' aria-hidden='true' />
          ) : (
            <HiOutlineStar className='w-5 h-5' aria-hidden='true' />
          )}
        </button>
      </>
    )}
  </Combobox.Option>
)

export default function ProviderSelect({ providers, selected, onChange }) {
  const [preferredProviders, setPreferred] = useLocalStorageState('cs3.meshdir.preferredProviders', {
    ssr: true,
    defaultValue: [],
  })
  const [geoSupport, setGeoSupport] = useState(false)
  const [geoLoading, setGeoLoading] = useState(false)
  const [query, setQuery] = useState('')
  const providersInput = useRef(null)
  const providersComboToggle = useRef(null)

  const isPreferred = (provider) => preferredProviders.includes(provider.name)

  const filteredProviders = query === '' ? providers : providers.filter((provider) => matches(provider, query))

  const sortedProviders = filteredProviders.sort((a, b) => {
    if (isPreferred(a) && !isPreferred(b)) return -1
    if (isPreferred(b) && !isPreferred(a)) return 1
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
    return 0
  })

  function getNearest() {
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLoading(false)
      const myLocation = { lat: position.coords.latitude, lon: position.coords.longitude }
      const { provider: nearestProvider } = providers
        .map((p) => ({ provider: p, dist: geoDistance(myLocation, p.location) }))
        .reduce((prev, curr) => (prev.dist > curr.dist ? curr : prev))

      if (nearestProvider) {
        onChange(nearestProvider)
      }
    })
  }

  function togglePreferred(event, provider) {
    event.preventDefault()

    setPreferred((currentPreferred) =>
      isPreferred(provider)
        ? currentPreferred.filter((p) => p !== provider.name)
        : [...currentPreferred, provider.name],
    )
  }

  useEffect(() => {
    providersInput.current.focus()
    // https://github.com/tailwindlabs/headlessui/discussions/1236
    providersComboToggle.current.click()
    if (navigator.geolocation) {
      setGeoSupport(true)
    }
  }, [])

  return (
    <Combobox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <div className='flex flex-col'>
            <div className='relative w-full overflow-hidden text-left bg-white border-b-2 border-dotted cursor-default border-b-primary focus:outline-none focus:ring-2 focus:ring-orange sm:text-sm'>
              <Combobox.Input
                ref={providersInput}
                aria-label='Enter your ScienceMesh site'
                className='w-full py-2 pr-10 text-4xl truncate border-none leading-5 focus:ring-0 text-primary-dark focus:outline-none'
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(provider) => provider?.fullName}
              />
              <Combobox.Button
                ref={providersComboToggle}
                title='Expand'
                arial-label='Expand'
                className='absolute inset-y-0 flex items-center right-1'>
                <HiChevronDown
                  className='z-10 w-5 h-5 bg-white rounded-full text-primary-dark hover:text-secondary-dark'
                  aria-hidden='true'
                />
              </Combobox.Button>
              {geoSupport && (
                <button
                  title='Find nearest'
                  aria-label='Find nearest'
                  onClick={getNearest}
                  disabled={geoLoading}
                  className='absolute inset-y-0 my-4 right-10 text-primary-dark hover:text-secondary-dark focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-0'>
                  {(geoLoading && (
                    <BiLoaderCircle className='z-10 w-5 h-5 bg-white rounded-full p-y-10 animate-spin' />
                  )) || <BiCurrentLocation aria-hidden='true' className='z-10 w-5 h-5 bg-white rounded-full p-y-10' />}
                </button>
              )}
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter='transition duration-200'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              afterLeave={() => setQuery('')}>
              <Combobox.Options
                static
                className='w-full py-1 mt-2 overflow-auto text-base bg-white border-t-0 rounded-sm max-h-60 shadow-sm border-10 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {sortedProviders.length === 0 && query !== '' ? (
                  <NoResults query={query} />
                ) : (
                  filteredProviders.map((provider) => <ProviderOption key={provider.name} provider={provider} />)
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </>
      )}
    </Combobox>
  )
}
