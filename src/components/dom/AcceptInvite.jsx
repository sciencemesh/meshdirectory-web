import { useState } from 'react'
import { useRouter } from 'next/router'
import { AiTwotoneExperiment } from 'react-icons/ai'
import ProviderSelect from '@/components/dom/ProviderSelect'
import ErrorBanner from '@/components/dom/ErrorBanner'

export default function AcceptInvite({ from, withProvider, setWithProvider, providers }) {
  const [error, setError] = useState(null)
  const { query, push: redirect } = useRouter()

  function acceptInvite() {
    if (!withProvider) {
      setError({ message: 'Please choose a valid ScienceMesh site' })
      return
    }

    if (!withProvider.acceptAPI) {
      setError({
        message: "This site doesn't host required services. Please choose another one.",
      })
      return
    }

    const acceptApiURL = new URL(withProvider.acceptAPI)
    redirect({
      // Merge invite link query params with
      // target accept invitation API URL and redirect
      origin: acceptApiURL.origin,
      pathname: acceptApiURL.pathname,
      protocol: acceptApiURL.protocol,
      host: acceptApiURL.host,
      hostname: acceptApiURL.hostname,
      query,
    })
  }

  function onProviderChange(provider) {
    setError(null)
    setWithProvider(provider)
  }

  return (
    <div className='left-0 z-20 h-full px-6 mx-auto sm:absolute md:px-10 bg-white/80 backdrop-blur-md'>
      <section className='flex flex-col items-center justify-center h-full text-center sm:items-start sm:text-left sm:py-6 grow text-md text-secondary gap-6'>
        <span className='inline-block font-light'>Accept an invitation to collaborate from</span>
        <span className='py-2 text-4xl font-medium border-b-2 border-dotted border-b-primary text-primary-dark'>
          {from?.fullName || from?.name || <div className='w-48 h-8 rounded-sm animate-pulse bg-slate-300' />}
        </span>
        <span className='inline-block font-light'>using your</span>
        <div className='w-auto min-w-[25rem] max-w-7xl'>
          <ProviderSelect providers={providers} selected={withProvider} onChange={onProviderChange} />
          {error && <ErrorBanner className='mt-2' error={error} />}
        </div>
        <span className='inline-block font-extralight'>
          {from?.properties?.INFRASTRUCTURE === 'Test' && (
            <span className='py-1 mr-2 font-bold text-red-800 bg-red-100 rounded px-2.5'>
              <AiTwotoneExperiment className='inline-block w-5 h-5 my-2 mr-2' />
              TESTING
            </span>
          )}
          ScienceMesh site account.
        </span>
        <button
          onClick={acceptInvite}
          title='Accept invite'
          aria-label='Accept invite'
          className='px-4 py-2 mt-4 text-2xl font-medium text-white shadow-lg w-72 rounded-md bg-gradient-to-br from-primary to-secondary-dark hover:from-orange-600 hover:to-primary-dark focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
          Accept
        </button>
      </section>
    </div>
  )
}
