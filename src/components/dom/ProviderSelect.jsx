import { useState, useRef, useEffect, Fragment } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { BiCurrentLocation, BiLoaderCircle } from 'react-icons/bi'
import { Combobox, Transition } from '@headlessui/react'
import { matches, geoDistance } from '@/util'
import useLocalStorageState from 'use-local-storage-state'
import ErrorBanner from '@/components/dom/ErrorBanner'
import ProviderModal from '@/components/dom/ProviderModal'
import ProviderOption from '@/components/dom/ProviderOption'

const NoResults = ({}) => (
  <ErrorBanner
    error={{
      message: 'No ScienceMesh provider found by this name 🤷‍♂️.',
    }}
  />
)

export default function ProviderSelect({ providers, selected, onChange }) {
  const [preferredProviders, setPreferred] = useLocalStorageState('cs3.meshdir.preferredProviders', {
    ssr: true,
    defaultValue: [],
  })
  const [details, setDetails] = useState(null)
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

  function openDetails(e, provider) {
    e.preventDefault()
    setDetails(provider)
  }

  function closeDetails(e) {
    e && e.preventDefault()
    setDetails(null)
  }

  function getNearest() {
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLoading(false)
      const myLocation = { lat: position.coords.latitude, lng: position.coords.longitude }
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
    queryInput.current.focus()
    // https://github.com/tailwindlabs/headlessui/discussions/1236
    providersComboToggle.current.click()
    if (navigator.geolocation) {
      setGeoSupport(true)
    }
  }, [])

  return (
    <>
      <Combobox value={selected} onChange={onChange} disabled={details}>
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
                  className='absolute inset-y-0 flex items-center p-2 right-1'>
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
                    className='absolute inset-y-0 px-2 my-4 right-10 text-primary-dark hover:text-secondary-dark focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-0'>
                    {(geoLoading && (
                      <BiLoaderCircle className='z-10 w-5 h-5 bg-white rounded-full p-y-10 animate-spin' />
                    )) || (
                      <BiCurrentLocation aria-hidden='true' className='z-10 w-5 h-5 bg-white rounded-full p-y-10' />
                    )}
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
                  hold={details}
                  className='w-full py-1 mt-2 overflow-auto text-base bg-white border-t-0 rounded-sm shadow-md max-h-60 border-10 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {sortedProviders.length === 0 && query !== '' ? (
                    <NoResults query={query} />
                  ) : (
                    filteredProviders.map((provider) => (
                      <ProviderOption
                        key={provider.name}
                        provider={provider}
                        preferred={isPreferred(provider)}
                        togglePreferred={togglePreferred}
                        openDetails={openDetails}
                      />
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </>
        )}
      </Combobox>
      <ProviderModal provider={details} close={closeDetails} />
    </>
  )
}
