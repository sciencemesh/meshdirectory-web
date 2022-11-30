import { useState } from 'react'
import ProviderSelect from '@/components/dom/ProviderSelect'
import ErrorBanner from '@/components/dom/ErrorBanner'

export default function AcceptInvite({ from, withProvider, setWithProvider, providers }) {
  const [error, setError] = useState(null)

  function acceptInvite() {
    if (!canAccept) {
      setClientError({ message: 'Please choose a valid ScienceMesh site' })
      return
    }

    const inviteApiURL = getInviteAPI(selectedProvider, 'accept')
    if (!inviteApiURL) {
      setError({
        message: "This site doesn't host required services. Please choose another one.",
      })
      return
    }

    redirect({
      // Merge invite link query params with
      // target accept invitation API URL and redirect
      origin: inviteApiURL.origin,
      pathname: inviteApiURL.pathname,
      protocol: inviteApiURL.protocol,
      host: inviteApiURL.host,
      hostname: inviteApiURL.hostname,
      query,
    })
  }

  function onProviderChange(provider) {
    setError(null)
    setWithProvider(provider)
  }

  return (
    <div className='z-20 pl-10 pr-6 h-[60vh] min-w-[25vw] bg-white/75 backdrop-blur-md'>
      <section className='flex flex-col items-start justify-center pl-6 my-24 text-left grow text-md text-secondary gap-6'>
        <span className='inline-block font-light'>Accept an invitation to collaborate from</span>
        <span className='py-2 text-4xl font-medium border-b-2 border-dotted border-b-primary text-primary-dark'>
          {from?.fullName || <div className='w-48 h-8 rounded-sm animate-pulse bg-slate-300' />}
        </span>
        <span className='inline-block font-light'>with your</span>
        <div className='w-auto max-w-7xl'>
          <ProviderSelect providers={providers} selected={withProvider} onChange={onProviderChange} />
          {error && <ErrorBanner className='mt-2' error={error} />}
        </div>
        <span className='inline-block font-extralight'>ScienceMesh site account.</span>
        <button
          onClick={acceptInvite}
          title='Accept invite'
          aria-label='Accept invite'
          className='px-4 py-2 mt-10 text-2xl font-medium text-white shadow-lg w-72 rounded-md bg-gradient-to-br from-primary to-secondary-dark hover:from-orange-600 hover:to-primary-dark focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
          Accept
        </button>
      </section>
    </div>
  )
}
