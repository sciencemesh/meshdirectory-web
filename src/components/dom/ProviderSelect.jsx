import { useState, useRef, useEffect, Fragment } from 'react'
import { HiChevronDown, HiOutlineStar, HiStar } from 'react-icons/hi'
import { SiNextcloud, SiIcloud } from 'react-icons/si'
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

const NextcloudIcon = (props) => <SiNextcloud {...props} />
const OwnCloudIcon = (props) => <SiIcloud {...props} />

const ProviderOption = ({ provider, preferred, togglePreferred }) => {
  let EFSSIcon = null
  const efssProduct = provider.efss?.product || provider.efss?.productname
  switch (efssProduct ? efssProduct.toLowerCase() : '') {
    case 'nextcloud':
      EFSSIcon = NextcloudIcon
      break
    case 'owncloud':
      EFSSIcon = OwnCloudIcon
    default:
      break
  }

  return (
    <Combobox.Option
      value={provider}
      className={({ active }) =>
        `flex items-center no-wrap cursor-default select-none p-4 ${
          active ? 'bg-primary-dark text-white' : 'text-gray-900'
        }`
      }>
      {({ selected }) => (
        <>
          <button
            aria-hidden='true'
            tabIndex='-1'
            onClick={(e) => togglePreferred(e, provider)}
            className={`flex items-center pr-3 z-20 ${preferred ? 'text-yellow-500' : 'text-gray-100'}`}>
            {preferred ? (
              <HiStar className='w-5 h-5' aria-hidden='true' />
            ) : (
              <HiOutlineStar className='w-5 h-5' aria-hidden='true' />
            )}
          </button>
          <span className={`grow truncate ${selected ? 'font-semibold text-lg' : 'font-normal'}`}>
            {provider.fullName || provider.name}
          </span>
          {EFSSIcon && (
            <span className={({ active }) => `self-end ${active ? 'text-gray-100' : '!text-primary'}`}>
              <EFSSIcon className='w-5 h-5' aria-hidden='true' />
            </span>
          )}
        </>
      )}
    </Combobox.Option>
  )
}

export default function ProviderSelect({ providers, selected, onChange }) {
  const [preferredProviders, setPreferred] = useLocalStorageState('cs3.meshdir.preferredProviders', {
    ssr: true,
    defaultValue: [],
  })
  const [geoSupport, setGeoSupport] = useState(false)
  const [geoLoading, setGeoLoading] = useState(false)
  const [query, setQuery] = useState('')
  const queryInput = useRef(null)
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
  console.log('f', filteredProviders)

  useEffect(() => {
    queryInput.current.focus()
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
            <div className='relative w-full overflow-hidden text-center border-b-2 border-dotted rounded-sm cursor-default bg-white/75 backdrop-blur-md sm:text-left border-b-primary focus:outline-none focus:ring-2 focus:ring-orange sm:text-sm'>
              <Combobox.Input
                ref={queryInput}
                aria-label='Enter your ScienceMesh site'
                className='w-full py-2 pr-10 text-4xl text-center truncate border-none  sm:text-left leading-5 bg-white/75 backdrop-blur-md focus:ring-0 text-primary-dark focus:outline-none'
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(provider) => provider?.fullName || provider?.name}
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
                  filteredProviders.map((provider) => (
                    <ProviderOption
                      key={provider.name}
                      provider={provider}
                      preferred={isPreferred(provider)}
                      togglePreferred={togglePreferred}
                    />
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